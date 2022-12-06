import mongoose from "mongoose";

import { Product } from "../models/product.js";

export async function get(req, res) {
  let { page = 1, limit = 5, search, category } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  let products, total;

  try {
    total = await Product.countDocuments();

    if (search) {
      const name = new RegExp(search, "i");
      total = await Product.countDocuments({ name: name });
      products = await Product.find({ name: name })
        .limit(Number(limit))
        .skip(start);
      return res.status(200).json({
        items: products,
        pageInfo: {
          resultsPerPage: Number(limit),
          totalResults: total,
          currentPage: Number(page),
          ...(end < total && { nextPage: Number(page) + 1 }),
          ...(start && end < total && { previousPage: Number(page) - 1 }),
        },
      });
    }

    if (category) {
      const name = new RegExp(category, "i");
      total = await Product.countDocuments({ category: name });
      products = await Product.find({ category: name })
        .limit(Number(limit))
        .skip(start);
      return res.status(200).json({
        items: products,
        pageInfo: {
          resultsPerPage: Number(limit),
          totalResults: total,
          currentPage: Number(page),
          ...(end < total && { nextPage: Number(page) + 1 }),
          ...(start && end < total && { previousPage: Number(page) - 1 }),
        },
      });
    }

    products = await Product.find().limit(Number(limit)).skip(start);
    return res.status(200).json({
      items: products,
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
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getByProductId(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "No Product with that ID" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ message: "No Product with that ID" });
    }
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ message: "No Product with that ID" });
    }
    await Product.findByIdAndRemove(productId);
    res.json({ _id: productId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
