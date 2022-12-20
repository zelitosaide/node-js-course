import mongoose from "mongoose";

const boxCategorySchema = mongoose.Schema({
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

const BoxCategory = mongoose.model("BoxCategory", boxCategorySchema);

export { BoxCategory };
