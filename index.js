import express from  "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./Routes/authRoutes.js";
import videoRoutes from "./Routes/videoRoutes.js";
import commentRoutes from './Routes/commentRoutes.js';
import translateRoutes from "./Routes/translateRoutes.js";
import subscriptionRoutes from "./Routes/subscriptionRoutes.js";
import emailRoutes from "./Routes/emailRoutes.js";
import otpRoutes from "./Routes/otpRoutes.js";
import http from "http";
import { initSocket } from "./socket.js";
import path from "path";
import { fileURLToPath } from "url";
import historyRoutes from "./Routes/historyRoutes.js";
import RazorpayRoutes from "./Routes/RazorpayRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import downloadRoutes from "./Routes/downloadRoutes.js";

dotenv.config()
const app=express()

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.get("/",(req,res)=> {
    res.send("stream link backend is working")
})

const PORT=process.env.PORT||5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth",authRoutes);
app.use("/video",videoRoutes);
app.use("/comment",commentRoutes);
app.use("/translate",translateRoutes);
app.use("/subscription",subscriptionRoutes);
app.use("/email",emailRoutes);
app.use("/otp",otpRoutes);
app.use("/history", historyRoutes);
app.use("/payment",RazorpayRoutes);
app.use("/user", userRoutes);
app.use("/downloads", downloadRoutes);

const server = http.createServer(app);
initSocket(server);
server.listen(PORT,  () =>{
    console.log(`Server running on port ${PORT}`);
});
const DBURL=process.env.DB_URL
mongoose.connect(DBURL).then(()=>{
    console.log("Mongodb connected")
}).catch((error)=> {
    console.log(error)
})