 import express  from "express";
 import { sendInvoiceEmail } from "../Controllers/emailController.js";
 const router=express.Router();
 router.post("/invoice",sendInvoiceEmail);
 export default router;
