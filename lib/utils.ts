export function extractPrice(...ele: any) {
  for (const e of ele) {
    const priceText = e.text().trim();

    if (priceText) return priceText.replace(/[^\d.]/g, "");
  }
  return "";
}
