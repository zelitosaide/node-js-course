import mongoose from "mongoose";

const productCategorySchema = mongoose.Schema({
  name: String,
  imageUrl: String,
  description: {
    type: String,
    default: "Some content...",
  },
  flag: Object,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

export { ProductCategory };
