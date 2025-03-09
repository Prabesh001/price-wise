"use server";

import { scrapeDarazProduct } from "../scrapper";

export async function scrapeAndStoreProduct(url: string) {
  if (!url) {
    return;
  }
  try {
    const scrappedProduct = await scrapeDarazProduct(url);
  } catch (error:any) {
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}
