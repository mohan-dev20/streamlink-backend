import History from "../Modals/history.js";

export const saveHistory = async (req, res) => {
  try {
    const { userId, videoId } = req.body;

    let history = await History.findOne({
      userId,
      videoId,
    });

    if (history) {
      history.watchedAt = new Date();
      await history.save();

      return res.json(history);
    }

    history = await History.create({
      userId,
      videoId,
    });

    res.status(201).json(history);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({
      userId: req.params.userId,
    })
      .populate("videoId")
      .sort({
        watchedAt: -1,
      });

    res.json(history);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const clearHistory = async (req, res) => {
  try {
    await History.deleteMany({
      userId: req.params.userId,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};