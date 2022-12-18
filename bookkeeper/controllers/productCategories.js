import mongoose from "mongoose";

import { ProductCategory } from "../models/productCategory.js";

export async function get(req, res) {
  let { page = 1, limit = 5, search } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  let productCategories, total;

  try {
    total = await ProductCategory.countDocuments();

    if (search) {
      const name = new RegExp(search, "i");
      total = await ProductCategory.countDocuments({ name: name });
      productCategories = await ProductCategory.find({ name: name })
        .limit(Number(limit))
        .skip(start);
      return res.status(200).json({
        items: productCategories,
        pageInfo: {
          resultsPerPage: Number(limit),
          totalResults: total,
          currentPage: Number(page),
          ...(end < total && { nextPage: Number(page) + 1 }),
          ...(start && end < total && { previousPage: Number(page) - 1 }),
        },
      });
    }

    productCategories = await ProductCategory.find()
      .limit(Number(limit))
      .skip(start);
    return res.status(200).json({
      items: productCategories,
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
    const productCategory = new ProductCategory(req.body);
    await productCategory.save();
    res.status(201).json(productCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getByProductCategoryId(req, res) {
  try {
    const { productCategoryId } = req.params;
    const productCategory = await ProductCategory.findById(productCategoryId);
    if (!productCategory) {
      return res
        .status(404)
        .json({ message: "No ProductCategory with that ID" });
    }
    res.status(200).json(productCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  // try {
  //   const { productId } = req.params;
  //   if (!mongoose.Types.ObjectId.isValid(productId)) {
  //     return res.status(404).json({ message: "No Product with that ID" });
  //   }
  //   const product = await Product.findByIdAndUpdate(productId, req.body, {
  //     new: true,
  //   });
  //   res.status(200).json(product);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
}

export async function remove(req, res) {
  // try {
  //   const { productId } = req.params;
  //   if (!mongoose.Types.ObjectId.isValid(productId)) {
  //     return res.status(404).json({ message: "No Product with that ID" });
  //   }
  //   await Product.findByIdAndRemove(productId);
  //   res.json({ _id: productId });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
}
