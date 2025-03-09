import puppeteer from "puppeteer";

export async function scrapeDarazProduct(url: string) {
  if (!url) return;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const title = await page.$eval(".pdp-mod-product-badge-title", (el) =>
      el.textContent?.trim()
    );

    const currentPrice = await page
      .$eval(".pdp-price", (el) => el.textContent?.trim())
      .catch(() => "");
    const originalPrice = await page
      .$eval(".pdp-price_type_deleted", (el) => el.textContent?.trim())
      .catch(() => "");
    const discount = await page
      .$eval(".pdp-product-price__discount", (el) => el.textContent?.trim())
      .catch(() => "");

    const rating = await page
      .$eval(".score-average", (el) => el.textContent?.trim())
      .catch(() => "");

    const image = await page.$eval(".gallery-preview-panel__image", (el) =>
      el.getAttribute("src")
    );

    const imagesUrl = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".item-gallery__thumbnail-image")
      )
        .map((img) => img.getAttribute("src"))
        .filter((src) => src !== null);
    });

    await browser.close();

    const data = {
      url,
      title,
      currentPrice,
      originalPrice,
      image: image || imagesUrl.forEach((img) => img),
      priceHistory: [],
      discount,
      rating,
    };

    console.log(data);
    return { title, currentPrice, originalPrice, discount, image, imagesUrl };
  } catch (error: any) {
    console.error(`Failed to scrape product: ${error.message}`);
    await browser.close();
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}

// import axios from "axios";
// import * as cheerio from "cheerio";
// import { extractPrice } from "../utils";

// export async function scrapeDarazProduct(url: string) {
//   if (!url) return;

//   const username = String(process.env.BRIGHT_DATA_USERNAME);
//   const password = String(process.env.PASSWORD);
//   const port = 33335;
//   const session_id = (1000000 * Math.random()) | 0;

//   const options = {
//     auth: {
//       username: `${username}-session-${session_id}`,
//       password,
//     },
//     host: "brd.superproxy.io",
//     port,
//     rejectUnauthorized: false,
//   };

//   try {
//     const response = await axios.get(url, options);

//     const $ = cheerio.load(response.data);

//     const title = $(".pdp-mod-product-badge-title").text().trim();
//     const currentPrice = extractPrice(
//       $(".pdp-price_type_normal") ||
//         $(".pdp-price_color_orange") ||
//         $("pdp-price_size_xl")
//     );

//     const originalPrice = extractPrice($(".pdp-price_type_deleted"));

//     const image =
//       $(".item-gallery.pdp-mod-common-image").attr("src") ||
//       $(".gallery-preview-panel__image").attr("src");

//     console.log({ title, currentPrice, originalPrice, image });
//   } catch (error: any) {
//     throw new Error(`Failed to scrape product: ${error.message}`);
//   }
// }
