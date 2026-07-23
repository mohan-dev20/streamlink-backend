import nodemailer from "nodemailer";
export const sendInvoiceEmail = async (req, res) => {
  try {
    const { email, plan, amount } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const html = `
<div style="font-family:Arial;background:#f5f7fb;padding:30px;">

<div style="
max-width:700px;
margin:auto;
background:white;
padding:35px;
border-radius:18px;
box-shadow:0 8px 25px rgba(0,0,0,.1);
">

<h1 style="
text-align:center;
color:#2563eb;
font-size:40px;
">
▶ StreamLink
</h1>

<h2 style="
text-align:center;
color:#16a34a;
">
🎉 Payment Successful
</h2>

<p style="
text-align:center;
font-size:18px;
color:#555;
">
Thank you for upgrading your StreamLink Premium Plan.
</p>

<hr>

<table style="
width:100%;
font-size:18px;
">

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
<td style="color:green;">
SUCCESS
</td>
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

<div style="
margin-top:35px;
text-align:center;
color:#777;
">

Thank you for choosing StreamLink ❤️

<br><br>

Need Help?

<br>

support@streamlink.com

</div>

</div>

</div>
`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🎉 ${plan} Plan Activated`,
      html,
    });
    res.json({ success: true });
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
