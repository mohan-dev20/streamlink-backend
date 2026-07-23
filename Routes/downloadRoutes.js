import express from "express";
import Download from "../Modals/Download.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

//
// Save Download
//
router.post("/", auth, async (req, res) => {
  try {
    const { videoId, title, thumbnail, videoUrl } = req.body;

    const alreadyDownloaded = await Download.findOne({
      userId: req.user.id,
      videoId,
    });

    if (alreadyDownloaded) {
      return res.json({
        success: true,
        message: "Already Downloaded",
      });
    }

    const download = await Download.create({
      userId: req.user.id,
      videoId,
      title,
      thumbnail,
      videoUrl,
    });

    res.status(201).json({
      success: true,
      download,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//
// Get My Downloads
//
router.get("/", auth, async (req, res) => {
  try {
    const downloads = await Download.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(downloads);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
//
// Today's Download Count
//
router.get("/count/today", auth, async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const count = await Download.countDocuments({
      userId: req.user.id,
      downloadedAt: {
        $gte: start,
        $lte: end,
      },
    });

    res.json({
      success: true,
      count,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//
// Delete One Download
//
router.delete("/:id", auth, async (req, res) => {
  try {
    await Download.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//
// Delete All Downloads
//
router.delete("/", auth, async (req, res) => {
  try {
    await Download.deleteMany({
      userId: req.user.id,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;