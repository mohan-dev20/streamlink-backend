import express from "express";
import uploadProfile from "../Middleware/ProfileUpload.js";
import { updateProfile } from "../Controllers/UserController.js";
import { getUserById } from "../Controllers/UserController.js";
const router = express.Router();

router.post(
  "/update/:id",
  uploadProfile.single("profilePic"),
  updateProfile
);
router.get("/:id",getUserById);

export default router;