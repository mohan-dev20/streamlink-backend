import Otp from "../Modals/Otp.js";
import apiInstance from "../Utils/brevo.js";
import * as brevo from "@getbrevo/brevo";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndDelete({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const html = `
    <div style="font-family:Arial;padding:30px;background:#f5f5f5">
      <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:15px">
        <h1 style="color:#2563eb;text-align:center;">StreamLink</h1>

        <h2 style="text-align:center;">Email Verification</h2>

        <p style="text-align:center">
        Use the OTP below to verify your account.
        </p>

        <div style="
        font-size:42px;
        text-align:center;
        font-weight:bold;
        letter-spacing:8px;
        color:#2563eb;
        margin:30px;
        ">
        ${otp}
        </div>

        <p style="text-align:center;color:red;">
        OTP expires in 5 minutes
        </p>
      </div>
    </div>
    `;

    const emailData = new brevo.SendSmtpEmail();

    emailData.subject = "🔐 StreamLink Verification OTP";

    emailData.htmlContent = html;

    emailData.sender = {
      name: "StreamLink",
      email: "mohan14532@gmail.com",
    };

    emailData.to = [
      {
        email,
      },
    ];

    await apiInstance.sendTransacEmail(emailData);

    res.json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log(error);

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

    res.json({
      success: true,
      message: "OTP Verified",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};