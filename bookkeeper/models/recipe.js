import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  recipeItemsId: String,
  steps: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  time: Number,
  authorId: String,
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

const Recipe = mongoose.model("Recipe", recipeSchema);

export { Recipe };
