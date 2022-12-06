import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  price: Number,
  flag: {
    type: Object,
    default: {
      createdByAdmin: true,
    },
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Product = mongoose.model("Product", productSchema);

export { Product };
