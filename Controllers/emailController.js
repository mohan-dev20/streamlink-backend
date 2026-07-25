import apiInstance from "../Utils/brevo.js";
import * as brevo from "@getbrevo/brevo";

export const sendInvoiceEmail = async (req, res) => {
  try {
    const { email, plan, amount } = req.body;

    const emailData = new brevo.SendSmtpEmail();

    emailData.subject = `${plan} Plan Activated`;

    emailData.sender = {
      name: "StreamLink",
      email: "mohan14532@gmail.com",
    };

    emailData.to = [
      {
        email,
      },
    ];

    emailData.htmlContent = `
      <h2>Payment Successful</h2>

      <p><b>Plan:</b> ${plan}</p>

      <p><b>Amount:</b> ₹${amount}</p>

      <p>Thank you for upgrading to StreamLink Premium.</p>
    `;

    await apiInstance.sendTransacEmail(emailData);

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