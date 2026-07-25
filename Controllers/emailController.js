import brevo from "../Utils/brevo.js";

export const sendInvoiceEmail = async (req, res) => {
  try {
    const { email, plan, amount } = req.body;

   await brevo.post("/smtp/email", {
  sender: {
    name: "StreamLink",
    email: "mohan14532@gmail.com",
  },

  to: [
    {
      email,
    },
  ],

  subject: `${plan} Plan Activated`,

  htmlContent: `
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