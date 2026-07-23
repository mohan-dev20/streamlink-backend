import  User  from "../Modals/Auth.js";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found",});
        }
        const isMatch=await bcrypt.compare(
            password,
            user.password
        );
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid cresentials"
            });
        }
        const token=jwt.sign({
            id:user._id,

        },
    process.env.JWT_SECRET,
    {
    expiresIn:"7d",
    }
);
res.status(200).json({
    success:true,
    token,
    user,
});

    }catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};
export const register=async(req, res)=>{
    try{
        const {username,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if (existingUser){
            return res.status(400).json({
                message:"User already exists",

            });
        }
            const hashedPassword=await bcrypt.hash(password,10);
           const user = await User.create({
    username,
    email,
    password: hashedPassword,
    plan: "FREE",
    isPremium: false,

    subscribers: Math.floor(Math.random() * 50000) + 1000,
});
            res.status(201).json({
                success:true,
                user,
            });
    }catch (error){
        res.status(500).json({
            message:error.message,
        });
    }


};