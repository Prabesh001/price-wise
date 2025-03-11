export type ProductData = {
  _id?: string;
  url: string;
  title: string | any;
  description: string | any;
  currentPrice: number;
  originalPrice: number;
  image: string;
  currency: string;
  priceHistory: number[] | string[] | any;
  discount: number;
  rating: number | null;
  lowestPrice: number;
  highestPrice: number;
  average: number;
};

export type PriceHistoryItem = {
  url: string;
  title: string | any;
  currentPrice: number;
  originalPrice: number;
  image: string;
  currency: string;
  priceHistory: number[];
  discount: number;
  rating: number | null;
  lowestPrice: number;
  highestPrice: number;
  average: number;
  price: number;
};

export type PriceInfoType = {
  title: string;
  value: string;
  icon: string;
};

export type User = {
  email: string;
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};

export type IDProps = {
  id: string;
};
