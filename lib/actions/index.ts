"use server";

import { User } from "@/type/ProductType";
import Product from "../models/Product.model";
import { connectToDB } from "../mongoose";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { scrapeDarazProduct } from "../scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";

export async function scrapeAndStoreProduct(url: string) {
  if (!url) {
    return;
  }
  try {
    await connectToDB();
    const scrappedProduct = await scrapeDarazProduct(url);

    if (!scrappedProduct) return;

    let product = scrappedProduct;

    const existingProduct = await Product.findOne({ url: scrappedProduct.url });
    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: scrappedProduct.currentPrice },
      ];

      product = {
        ...scrappedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        average: getAveragePrice(updatedPriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      { url: scrappedProduct.url },
      product,
      { upsert: true, new: true }
    );
    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    await connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    await connectToDB();

    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(id: string) {
  try {
    await connectToDB();

    const currentProduct = await Product.findById(id);
    if (!currentProduct) return null;

    const similarProduct = await Product.find({
      _id: { $ne: id },
    }).limit(3);
    return similarProduct;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(id: string, userEmail: string) {
  try {
    const product = await Product.findById(id);
    if (!product) return;

    const userExist = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExist) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
