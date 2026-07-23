import express, { Router } from "express";
import { addComment,getComments,dislikeComment,likeComment,deleteComment,editComment } from "../Controllers/commentController.js";
const router=express.Router();
router.post("/",addComment);
router.get("/:videoId",getComments);
router.put("/:id/dislike",dislikeComment);
router.put("/:id/like",likeComment);
router.delete("/:id",deleteComment);
router.put("/:id/edit",editComment);
export default router;
  