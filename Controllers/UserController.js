import User from "../Modals/Auth.js";
import { uploadToCloudinary } from "../Utils/cloudinaryUpload.js";

export const updateProfile = async (req, res) => {
  try {
    const { username, bio, city } = req.body;

    const updateData = {
      username,
      bio,
      city,
    };

   if (req.file) {
  const uploaded = await uploadToCloudinary(
    req.file.buffer,
    "streamlink/profile"
  );

  updateData.profilePic = uploaded.secure_url;
}

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};