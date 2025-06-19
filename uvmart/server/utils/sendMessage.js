import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  try {
    if (!receiverEmail) return;

    // Read the HTML file
    const templatePath = path.join(__dirname, 'templates', 'otp.html');
    let messageHtml = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholder with real OTP
    messageHtml = messageHtml.replace('{{OTP}}', otp);

    const messageText = `This message is from uvMart. Please do not share this with anyone. Your One-Time Password is: ${otp}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: 'Your uvMart OTP Verification Code',
      text: messageText,
      html: messageHtml
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ OTP sent via Email');
  } catch (error) {
    console.error('❌ Error sending OTP:', error.message);
    throw new Error('Failed to send OTP');
  }
};

export const sendApprovele = async (receiverEmail, category, adminInfo) => {
  try {
    if (!receiverEmail) throw new Error('Receiver email is required');

    const filePath = path.join(__dirname, 'templates', 'approve.html'); 

    // ✅ Use await version with encoding
    const htmlContent = await fs.readFile(filePath, 'utf-8');
const customizedHtml = htmlContent
  .replace(/{{CATEGORY_NAME}}/g, category?.categories || 'N/A')
  .replace(/{{CATEGORY_DESC}}/g, category?.description || 'N/A')
  .replace(/{{CATEGORY_STATUS}}/g, category?.status || 'N/A')
  .replace(/{{APPROVED_BY}}/g, adminInfo?.fullName || 'N/A')
  .replace(/{{APPROVED_DATE}}/g, new Date().toLocaleString());

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: 'Your Category Has Been Approved - uvMart',
      html: customizedHtml,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Approval email sent to:', receiverEmail);

  } catch (error) {
    console.error('❌ Error sending approval email:', error);
    throw new Error('Failed to send approval email');
  }
};