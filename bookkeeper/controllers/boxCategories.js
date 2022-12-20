import mongoose from "mongoose";

import { BoxCategory } from "../models/boxCategory.js";

export async function get(req, res) {
  let { page = 1, limit = 5, search } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  let boxCategories, total;

  try {
    total = await BoxCategory.countDocuments();

    if (search) {
      const name = new RegExp(search, "i");
      total = await BoxCategory.countDocuments({ name: name });
      boxCategories = await BoxCategory.find({ name: name })
        .limit(Number(limit))
        .skip(start);
      return res.status(200).json({
        items: boxCategories,
        pageInfo: {
          resultsPerPage: Number(limit),
          totalResults: total,
          currentPage: Number(page),
          ...(end < total && { nextPage: Number(page) + 1 }),
          ...(start && end < total && { previousPage: Number(page) - 1 }),
        },
      });
    }

    boxCategories = await BoxCategory.find().limit(Number(limit)).skip(start);
    return res.status(200).json({
      items: boxCategories,
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
    const boxCategory = new BoxCategory(req.body);
    await boxCategory.save();
    res.status(201).json(boxCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getBoxCategoryById(req, res) {
  try {
    const { boxCategoryId } = req.params;
    const boxCategory = await BoxCategory.findById(boxCategoryId);
    if (!boxCategory) {
      return res.status(404).json({ message: "No BoxCategory with that ID" });
    }
    res.status(200).json(boxCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    const { boxCategoryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boxCategoryId)) {
      return res.status(404).json({ message: "No BoxCategory with that ID" });
    }
    const boxCategory = await BoxCategory.findByIdAndUpdate(
      boxCategoryId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(boxCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    const { boxCategoryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boxCategoryId)) {
      return res.status(404).json({ message: "No BoxCategory with that ID" });
    }
    await BoxCategory.findByIdAndRemove(boxCategoryId);
    res.json({ _id: boxCategoryId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
