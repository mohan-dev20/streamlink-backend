import Otp from "../Modals/Otp.js";
import nodemailer from "nodemailer";

export const sendOtp = async (req, res) => {
  console.log("====== OTP REQUEST RECEIVED ======");
  console.log(req.body);
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndDelete({
      email,
    });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("EMAIL USER:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
    });

    await transporter.verify();

    console.log("SMTP Connected Successfully");
    const html = `
<div style="font-family:Arial,sans-serif;background:#f4f7fb;padding:40px;">

<div style="
max-width:650px;
margin:auto;
background:#ffffff;
border-radius:20px;
padding:40px;
box-shadow:0 10px 25px rgba(0,0,0,.12);
">

<div style="text-align:center;">

<h1 style="
color:#2563eb;
font-size:42px;
margin-bottom:5px;
">
▶ StreamLink
</h1>

<p style="
color:#666;
font-size:18px;
">
Secure Login Verification
</p>

</div>

<hr style="margin:30px 0;">

<h2 style="
text-align:center;
color:#111827;
">
Verify Your Email
</h2>

<p style="
text-align:center;
font-size:17px;
color:#555;
line-height:28px;
">
Use the One-Time Password below to continue signing in to your StreamLink account.
</p>

<div
style="
margin:35px auto;
width:260px;
background:#2563eb;
color:white;
font-size:40px;
font-weight:bold;
letter-spacing:10px;
padding:20px;
border-radius:15px;
text-align:center;
">

${otp}

</div>

<p style="
text-align:center;
color:#dc2626;
font-weight:bold;
font-size:18px;
">
⏳ This OTP expires in 5 minutes.
</p>

<hr style="margin:35px 0;">

<div style="
background:#f9fafb;
padding:18px;
border-radius:12px;
font-size:15px;
color:#555;
line-height:26px;
">

<b>Security Tips</b>

<ul>

<li>Never share your OTP with anyone.</li>

<li>StreamLink will never ask for your OTP over phone or email.</li>

<li>If you didn't request this login, you can safely ignore this email.</li>

</ul>

</div>

<div style="
margin-top:35px;
text-align:center;
color:#777;
font-size:15px;
">

Need help?

<br>

support@streamlink.com

<br><br>

© 2026 StreamLink

</div>

</div>

</div>
`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔐 Your StreamLink Verification Code",
      html,
    });

    res.json({
      success: true,
      message: "OTP Sent",
    });
  } catch (error) {
    console.error("OTP ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });

    console.log("OTP IN DB:", record);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    }

    if (new Date() > record.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    if (record.otp.trim() !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    await Otp.deleteOne({
      _id: record._id,
    });

    return res.json({
      success: true,
      message: "OTP Verified",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
