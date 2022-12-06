import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  price: Number,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Product = mongoose.model("Product", productSchema);

export { Product };
