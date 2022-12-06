import mongoose from "mongoose";

import { Recipe } from "../models/recipe.js";

export async function get(req, res) {
  let { page = 1, limit = 5, search } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  let recipes, total;

  try {
    total = await Recipe.countDocuments();

    if (search) {
      const name = new RegExp(search, "i");
      recipes = await Recipe.find({ name: name });
      return res.status(200).json({ items: recipes });
    } else {
      recipes = await Recipe.find().limit(Number(limit)).skip(start);
      return res.status(200).json({
        items: recipes,
        pageInfo: {
          resultsPerPage: Number(limit),
          totalResults: total,
          currentPage: Number(page),
          ...(end < total && { nextPage: Number(page) + 1 }),
          ...(start && end < total && { previousPage: Number(page) - 1 }),
        },
      });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function create(req, res) {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getByRecipeId(req, res) {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "No Recipe with that ID" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    const { recipeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(404).json({ message: "No Recipe with that ID" });
    }
    const recipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    const { recipeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(404).json({ message: "No Recipe with that ID" });
    }
    await Recipe.findByIdAndRemove(recipeId);
    res.json({ _id: recipeId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
