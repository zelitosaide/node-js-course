import mongoose from "mongoose";

import { Invoice } from "../models/invoice.js";

export async function get(req, res) {
  const { page = 1, limit = 5 } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  try {
    const total = await Invoice.countDocuments();
    const invoices = await Invoice.find().limit(Number(limit)).skip(start);
    res.status(200).json({
      current: Number(page),
      ...(end < total && { next: Number(page) + 1 }),
      ...((start && end < total) && { previous: Number(page) - 1 }),
      limit: limit,
      total: total,
      items: invoices,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function create(req, res) {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function getByInvoiceId(req, res) {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "No Invoice with that ID" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    const { invoiceId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
      return res.status(404).json({ message: "No Invoice with that ID" });
    }
    const invoice = await Invoice.findByIdAndUpdate(invoiceId, req.body, { new: true });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    const { invoiceId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
      return res.status(404).json({ message: "No Invoice with that ID" });
    }
    await Invoice.findByIdAndRemove(invoiceId);
    res.json({ _id: invoiceId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}