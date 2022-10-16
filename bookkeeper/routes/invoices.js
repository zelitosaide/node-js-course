import express from "express";

import {
  get,
  create,
  update,
  remove,
  getByInvoiceId
} from "../controllers/invoices.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:invoiceId", update);
router.delete("/:invoiceId", remove);
router.get("/:invoiceId", getByInvoiceId);

export { router };