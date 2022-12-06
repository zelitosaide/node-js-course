import express from "express";

import {
  get,
  create,
  update,
  remove,
  getByBoxItemsId,
} from "../controllers/boxItems.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:boxItemsId", update);
router.delete("/:boxItemsId", remove);
router.get("/:boxItemsId", getByBoxItemsId);

export { router };
