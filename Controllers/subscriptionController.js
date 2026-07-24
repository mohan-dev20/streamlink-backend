import Subscription from "../Modals/subscription.js";
import User from "../Modals/Auth.js";

export const subscribeChannel = async (req, res) => {
  try {
    const { subscriberId, channelId } = req.body;

    const exists = await Subscription.findOne({
      subscriberId,
      channelId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already subscribed",
      });
    }

   const newSubscription = await Subscription.create({
  subscriberId,
  channelId,
});

// Increase subscriber count
await User.findByIdAndUpdate(channelId, {
  $inc: {
    subscribers: 1,
  },
});

res.status(201).json(newSubscription);
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const unsubscribeChannel = async (req, res) => {
  try {
    const { subscriberId, channelId } = req.body;

    const deleted = await Subscription.findOneAndDelete({
  subscriberId,
  channelId,
});

if (deleted) {
  await User.findByIdAndUpdate(channelId, {
    $inc: {
      subscribers: -1,
    },
  });
}

res.status(200).json({
  success: true,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getSubscriberCount = async (req, res) => {
  try {
    const user = await User.findById(req.params.channelId);

    res.status(200).json({
      subscribers: user?.subscribers || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getuserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
  subscriberId: req.params.userId,
}).populate(
  "channelId",
  "username profilePic subscribers"
);

const validSubscriptions = subscriptions.filter(
  (sub) => sub.channelId
);

res.status(200).json(validSubscriptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const checkSubscription = async (req, res) => {
  try {
    const { subscriberId, channelId } = req.body;

    const subscription = await Subscription.findOne({
      subscriberId,
      channelId,
    });

    res.json({
      success: true,
      subscribed: !!subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};