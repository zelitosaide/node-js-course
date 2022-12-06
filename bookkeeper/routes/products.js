import express from "express";

import {
  get,
  create,
  update,
  remove,
  getByProductId,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:productId", update);
router.delete("/:productId", remove);
router.get("/:productId", getByProductId);

export { router };
