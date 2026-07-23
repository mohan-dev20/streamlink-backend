import mongoose from "mongoose";
const subscriptionSchema= new mongoose.Schema(
    {
     subscriberId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requried:true,
     },
     
     channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requried:true,
     },
    },
  {timestamps:true}
);
export default mongoose.model("Subscription",subscriptionSchema);