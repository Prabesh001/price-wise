export type ProductData = {
  _id?: string;
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
