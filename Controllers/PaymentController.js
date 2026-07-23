import User from "../Modals/Auth.js";

export const updatePlan = async (req, res) => {
  try {
    const { email, plan, paymentId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.plan = plan;
    user.isPremium = plan !== "FREE";

    await user.save();

    res.json({
      success: true,
      message: "Plan Updated",
      paymentId,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};