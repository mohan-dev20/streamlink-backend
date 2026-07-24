import transporter from "../Utils/mailer.js";
import  resend from "../Utils/resend.js";

export const sendInvoiceEmail = async (req, res) => {
  try {
    const { email, plan, amount } = req.body;

    await transporter.emails.send({
      from: `"StreamLink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${plan} Plan Activated`,
      html: `
        <h2>Payment Successful</h2>

        <p>Plan: ${plan}</p>

        <p>Amount: ₹${amount}</p>

        <p>Thank you for upgrading to StreamLink Premium.</p>
      `,
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