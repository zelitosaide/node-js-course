import mongoose from "mongoose";

const RecipeItemsSchema = mongoose.Schema({
  ingredients: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const RecipeItems = mongoose.model("RecipeItems", RecipeItemsSchema);

export { RecipeItems };
