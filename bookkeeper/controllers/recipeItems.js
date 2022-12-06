import mongoose from "mongoose";

import { RecipeItems } from "../models/recipeItems.js";

export async function get(req, res) {
  let { page = 1, limit = 5 } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  try {
    const total = await RecipeItems.countDocuments();
    const recipeItems = await RecipeItems.find()
      .limit(Number(limit))
      .skip(start);
    return res.status(200).json({
      items: recipeItems,
      pageInfo: {
        resultsPerPage: Number(limit),
        totalResults: total,
        currentPage: Number(page),
        ...(end < total && { nextPage: Number(page) + 1 }),
        ...(start && end < total && { previousPage: Number(page) - 1 }),
      },
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function create(req, res) {
  try {
    const recipeItems = new RecipeItems(req.body);
    await recipeItems.save();
    res.status(201).json(recipeItems);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getByRecipeItemsId(req, res) {
  try {
    const { recipeItemsId } = req.params;
    const recipeItems = await RecipeItems.findById(recipeItemsId);
    if (!recipeItems) {
      return res.status(404).json({ message: "No RecipeItems with that ID" });
    }
    res.status(200).json(recipeItems);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    const { recipeItemsId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeItemsId)) {
      return res.status(404).json({ message: "No RecipeItems with that ID" });
    }
    const recipeItems = await RecipeItems.findByIdAndUpdate(
      recipeItemsId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(recipeItems);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    const { recipeItemsId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeItemsId)) {
      return res.status(404).json({ message: "No RecipeItems with that ID" });
    }
    await RecipeItems.findByIdAndRemove(recipeItemsId);
    res.json({ _id: recipeItemsId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
