import Product from "@/lib/models/Product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeDarazProduct } from "@/lib/scrapper";
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const products = await Product.find();

    if (!products) throw new Error("No products found!");

    const updatedProduct = await Promise.all(
      products.map(async (currentProduct) => {
        const scrappedProduct = await scrapeDarazProduct(currentProduct.url);

        if (!scrappedProduct) throw new Error("No product found!");

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrappedProduct.currentPrice },
        ];

        const product = {
          ...scrappedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          average: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: scrappedProduct.url },
          product
        );

        const emailNotifType = getEmailNotifType(
          scrappedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.user.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );

          const userEmails = updatedProduct.users.map((user: any) => {
            user.email;
          });

          await sendEmail(emailContent, userEmails);
        }
        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProduct,
    });

  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
