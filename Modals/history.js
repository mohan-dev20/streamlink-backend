import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    watchedAt: {
      type: Date,
      default: Date.now,
    },

    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

historySchema.index(
  {
    userId: 1,
    videoId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("History", historySchema);