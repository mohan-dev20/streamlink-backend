import express from "express";
import upload from "../Middleware/upload.js";
import { uploadVideo,getVideos,getVideoById,likeVideo,dislikeVideo,downloadVideo, getUserVideos, deleteVideo, increaseViews } from "../Controllers/videoController.js";

const router = express.Router();

router.post("/upload",upload.fields([{ name: "video", maxCount: 1 }, {name: "thumbnail", maxCount: 1 },]),uploadVideo );
router.get("/",getVideos);
router.get("/:id",getVideoById)
router.put("/:id/like",likeVideo);
router.put("/:id/dislike",dislikeVideo);
router.put("/:id/download",downloadVideo);
router.get("/user/:userId", getUserVideos);
router.delete("/:id", deleteVideo);
router.put("/:id/view", increaseViews);
export default router;