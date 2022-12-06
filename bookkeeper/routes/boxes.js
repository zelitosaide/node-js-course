import express from "express";

import {
  get,
  create,
  update,
  remove,
  getByBoxId,
} from "../controllers/boxes.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.patch("/:boxId", update);
router.delete("/:boxId", remove);
router.get("/:boxId", getByBoxId);

export { router };
