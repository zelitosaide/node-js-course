import express from "express";

import {
  get,
  create,
  update,
  remove,
  getProductCategoryById,
} from "../controllers/productCategories.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:productCategoryId", update);
router.delete("/:productCategoryId", remove);
router.get("/:productCategoryId", getProductCategoryById);

export { router };
