import express from "express";
import { uploadVideo,getVideos,getVideoById,likeVideo,dislikeVideo,downloadVideo, getUserVideos, deleteVideo, increaseViews } from "../Controllers/videoController.js";

const router = express.Router();

router.post("/upload",uploadVideo );
router.get("/",getVideos);
router.get("/:id",getVideoById)
router.put("/:id/like",likeVideo);
router.put("/:id/dislike",dislikeVideo);
router.put("/:id/download",downloadVideo);
router.get("/user/:userId", getUserVideos);
router.delete("/:id", deleteVideo);
router.put("/:id/view", increaseViews);
export default router;