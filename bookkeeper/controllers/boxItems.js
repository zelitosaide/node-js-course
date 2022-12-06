import mongoose from "mongoose";

import { BoxItems } from "../models/boxItems.js";

export async function get(req, res) {
  let { page = 1, limit = 5 } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  try {
    const total = await BoxItems.countDocuments();
    const boxItems = await BoxItems.find().limit(Number(limit)).skip(start);
    return res.status(200).json({
      items: boxItems,
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
    const boxItems = new BoxItems(req.body);
    await boxItems.save();
    res.status(201).json(boxItems);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getByBoxItemsId(req, res) {
  try {
    const { boxItemsId } = req.params;
    const boxItems = await BoxItems.findById(boxItemsId);
    if (!boxItems) {
      return res.status(404).json({ message: "No BoxItems with that ID" });
    }
    res.status(200).json(boxItems);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    const { boxItemsId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boxItemsId)) {
      return res.status(404).json({ message: "No BoxItems with that ID" });
    }
    const boxItems = await BoxItems.findByIdAndUpdate(boxItemsId, req.body, {
      new: true,
    });
    res.status(200).json(boxItems);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    const { boxItemsId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boxItemsId)) {
      return res.status(404).json({ message: "No BoxItems with that ID" });
    }
    await BoxItems.findByIdAndRemove(boxItemsId);
    res.json({ _id: boxItemsId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
