import Video from "../Modals/video.js";
import fs from "fs";
import path from "path";
import { uploadToCloudinary } from "../Utils/cloudinaryUpload.js";

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("userId", "username profilePic subscribers")
      .sort("-createdAt");
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const uploadVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      duration,
      userId,
      videoUrl,
      thumbnailUrl,
    } = req.body;

    const views = Math.floor(Math.random() * 50000) + 500;
    const likes = Math.floor(views * (Math.random() * 0.08 + 0.03));

    const video = await Video.create({
      title,
      description,
      category,
      duration,
      userId,
      videoUrl,
      thumbnailUrl,
      views,
      likes,
      dislikes: 0,
      downloads: 0,
    });

    res.status(201).json({
      success: true,
      video,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("userId", "username profilePic subscribers");
    if (!video) {
      return res.status(400).json({ message: "video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { returnDocument: "after" },
    );
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { returnDocument: "after" },
    );
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const downloadVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      {
        returnDocument: "after",
      },
    );
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      userId: req.params.userId,
    });

    res.json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "userId",
      "username profilePic email",
    );
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }


    await Video.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const increaseViews = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    res.json(video);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
