import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // App password, not your Gmail password!
  }
});

// Optional: Verify email transporter at startup
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email config error:', error.message);
  } else {
    console.log('✅ Email transporter is working');
  }
});

export const sendOTP = async (receiverEmail, otp) => {
  const messageText = `This message is from uvMart. Please do not share this with anyone. Your One-Time Password is: ${otp}`;

  try {
    if (receiverEmail) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: 'uvMart Signup Verification Code',
        text: messageText
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ OTP sent via Email');
    }
  } catch (error) {
    console.error('❌ Error sending OTP:', error.message);
    throw new Error('Failed to send OTP');
  }
};
