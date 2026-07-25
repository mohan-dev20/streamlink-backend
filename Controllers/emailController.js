import transporter from "../Utils/mailer.js";

export const sendInvoiceEmail = async (req, res) => {
  try {
    const { email, plan, amount } = req.body;

    const html = `
      <div style="font-family:Arial,sans-serif;padding:30px;background:#f4f7fb;">
        <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:15px;box-shadow:0 8px 20px rgba(0,0,0,.1);">

          <h1 style="color:#2563eb;text-align:center;">
            ▶ StreamLink
          </h1>

          <h2 style="text-align:center;color:#16a34a;">
            🎉 Payment Successful
          </h2>

          <hr>

          <table style="width:100%;font-size:18px;">
            <tr>
              <td><b>Plan</b></td>
              <td>${plan}</td>
            </tr>

            <tr>
              <td><b>Amount Paid</b></td>
              <td>₹${amount}</td>
            </tr>

            <tr>
              <td><b>Date</b></td>
              <td>${new Date().toLocaleString()}</td>
            </tr>

            <tr>
              <td><b>Status</b></td>
              <td style="color:green;">SUCCESS</td>
            </tr>
          </table>

          <hr>

          <h3>Premium Benefits</h3>

          <ul>
            <li>✔ Unlimited Streaming</li>
            <li>✔ HD Video Quality</li>
            <li>✔ Premium Downloads</li>
            <li>✔ Faster Playback</li>
            <li>✔ Premium Features Enabled</li>
          </ul>

          <div style="margin-top:30px;text-align:center;color:#777;">
            Thank you for choosing StreamLink ❤️
            <br><br>
            support@streamlink.com
          </div>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "StreamLink <mohan14532@gmail.com>",
      to: email,
      subject: `🎉 ${plan} Plan Activated`,
      html,
    });

    return res.json({
      success: true,
      message: "Invoice sent successfully",
    });

  } catch (err) {
    console.log("Invoice Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};