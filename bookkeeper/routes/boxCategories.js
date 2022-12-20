import express from "express";

import {
  get,
  create,
  update,
  remove,
  getBoxCategoryById,
} from "../controllers/boxCategories.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:boxCategoryId", update);
router.delete("/:boxCategoryId", remove);
router.get("/:boxCategoryId", getBoxCategoryById);

export { router };
