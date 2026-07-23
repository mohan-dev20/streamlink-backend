import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    email:String,
    otp:String,
    expriesAt:Date,
});
export default mongoose.model("otp",otpSchema);
