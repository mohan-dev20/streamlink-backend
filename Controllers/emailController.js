import transporter from "../Utils/mailer.js";

export const sendInvoiceEmail = async (req, res) => {
  try {
    const { email, plan, amount } = req.body;

    await transporter.sendMail({
  from: `"StreamLink" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `🎉 ${plan} Plan Activated`,
  html,
});
    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};