import express from "express";

import {
  get,
  create,
  update,
  remove,
  getByRecipeId,
} from "../controllers/recipes.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:recipeId", update);
router.delete("/:recipeId", remove);
router.get("/:recipeId", getByRecipeId);

export { router };
