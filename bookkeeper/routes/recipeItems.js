import express from "express";

import {
  get,
  create,
  update,
  remove,
  getByRecipeItemsId,
} from "../controllers/recipeItems.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:recipeItemsId", update);
router.delete("/:recipeItemsId", remove);
router.get("/:recipeItemsId", getByRecipeItemsId);

export { router };
