import express from "express";

import { createOrder } from "../Controllers/RazorpayController.js";
import { updatePlan } from "../Controllers/PaymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);

router.post("/update-plan", updatePlan);

export default router;