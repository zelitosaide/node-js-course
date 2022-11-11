import mongoose from "mongoose";

import { Invoice } from "../models/invoice.js";

export async function get(req, res) {
  let { page = 1, limit = 5, search, favorite } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  let invoices, total;

  try {
    // if (favorite) {
    //   total = await Invoice.countDocuments({ favorite: favorite === "true" });
    // } else {
    //   total = await Invoice.countDocuments();
    // }

    if (search) {
      const name = new RegExp(search, "i");
      invoices = await Invoice.find({ name: name });
      return res.status(200).json({
        items: invoices,
      });
    } else {
      if (favorite) {
        invoices = await Invoice.find({ favorite: favorite === "true" })
          .limit(Number(limit))
          .skip(start);
      } else {
        invoices = await Invoice.find().limit(Number(limit)).skip(start);
      }
      return res.status(200).json({
        items: invoices,
        // pageInfo: {
        //   resultsPerPage: Number(limit),
        //   totalResults: total,
        //   currentPage: Number(page),
        //   ...(end < total && { nextPage: Number(page) + 1 }),
        //   ...(start && end < total && { previousPage: Number(page) - 1 }),
        // },
      });
    }
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
    const invoice = await Invoice.findByIdAndUpdate(invoiceId, req.body, {
      new: true,
    });
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
