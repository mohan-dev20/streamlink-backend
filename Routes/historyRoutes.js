import express from "express";

import {
  saveHistory,
  getHistory,
  deleteHistory,
  clearHistory,
} from "../Controllers/historyController.js";

const router = express.Router();

router.post("/", saveHistory);

router.get("/:userId", getHistory);

router.delete("/:id", deleteHistory);

router.delete("/clear/:userId", clearHistory);

export default router;