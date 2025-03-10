import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    image: { type: String, required: true },
    currency: { type: String },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    discount: { type: Number },
    rating: { type: Number },
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    average: { type: Number },
    users: [
      {
        email: { type: String, required: true },
      },
    ],
    default: [],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product