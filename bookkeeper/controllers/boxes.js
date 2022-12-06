import mongoose from "mongoose";

import { Box } from "../models/box.js";

export async function get(req, res) {
  let { page = 1, limit = 5, search } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  let boxes, total;

  try {
    total = await Box.countDocuments();

    if (search) {
      const name = new RegExp(search, "i");
      boxes = await Box.find({ name: name });
      return res.status(200).json({ items: boxes });
    } else {
      boxes = await Box.find().limit(Number(limit)).skip(start);
      return res.status(200).json({
        items: boxes,
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
    const box = new Box(req.body);
    await box.save();
    res.status(201).json(box);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getByBoxId(req, res) {
  try {
    const { boxId } = req.params;
    const box = await Box.findById(boxId);
    if (!box) {
      return res.status(404).json({ message: "No Box with that ID" });
    }
    res.status(200).json(box);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    const { boxId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boxId)) {
      return res.status(404).json({ message: "No Box with that ID" });
    }
    const box = await Box.findByIdAndUpdate(boxId, req.body, {
      new: true,
    });
    res.status(200).json(box);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    const { boxId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boxId)) {
      return res.status(404).json({ message: "No Box with that ID" });
    }
    await Box.findByIdAndRemove(boxId);
    res.json({ _id: boxId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
