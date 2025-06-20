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

const mailOptions = async (to, subject, html, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html,
      text: text
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Sending Mail Is Not Done!!')
  }
}

export const sendOTP = async (receiverEmail, otp) => {
  try {
    if (!receiverEmail) return;

    // Read the HTML file
    const templatePath = path.join(__dirname, 'templates', 'otp.html');
    let messageHtml = await fs.readFile(templatePath, 'utf-8');

    // Replace placeholder with real OTP
    messageHtml = messageHtml.replace('{{OTP}}', otp);
    const messageText = `This message is from uvMart. Please do not share this with anyone. Your One-Time Password is: ${otp}`;
    const subject = 'Your uvMart OTP Verification Code';
    await mailOptions(receiverEmail, subject, messageHtml, messageText)
    console.log('✅ OTP sent via Email');
  } catch (error) {
    console.error('❌ Error sending OTP:', error.message);
    throw new Error('Failed to send OTP');
  }
};

export const sendCategoryStatusEmail = async (receiverEmail, category, adminInfo, action = 'approved') => {
  try {
    if (!receiverEmail) throw new Error('Receiver email is required');

    const templateName =
      action === 'approved' ? 'approveCategories.html' : 'rejectCategories.html';
    const filePath = path.join(__dirname, 'templates', templateName);

    const htmlContent = await fs.readFile(filePath, 'utf-8');

    const customizedHtml = htmlContent
      .replace(/{{CATEGORY_NAME}}/g, category?.categories || 'N/A')
      .replace(/{{CATEGORY_DESC}}/g, category?.description || 'N/A')
      .replace(/{{CATEGORY_STATUS}}/g, category?.status || (action === 'approved' ? 'Approved' : 'Rejected'))
      .replace(/{{ACTION_BY}}/g, adminInfo.fullName)
      .replace(/{{ACTION_BY_EMAIL}}/g, adminInfo.email)
      .replace(/{{ACTION_DATE}}/g, adminInfo.issuedAt);

    const subject = `Your Category Has Been ${action.charAt(0).toUpperCase() + action.slice(1)} - uvMart`;

    await mailOptions(receiverEmail, subject, customizedHtml);
    console.log(`✅ ${action.charAt(0).toUpperCase() + action.slice(1)} Categories email sent to:`, receiverEmail);

  } catch (error) {
    console.error(`❌ Error sending ${action} email:`, error);
    throw new Error(`Failed to send ${action} email`);
  }
};

export const sendStaffStatusEmail = async (receiverEmail, staff, adminInfo, action = 'approved') => {
  try {
    if (!receiverEmail) throw new Error('Receiver email is required');

    const templateName = action === 'approved' ? 'approveStaff.html' : 'rejectStaff.html';
    const filePath = path.join(__dirname, 'templates', templateName);

    const htmlContent = await fs.readFile(filePath, 'utf-8');

    const customizedHtml = htmlContent
      .replace(/{{STAFF_NAME}}/g, staff?.fullName || 'N/A')
      .replace(/{{STAFF_MOBILE}}/g, staff?.mobile || 'N/A')
      .replace(/{{STAFF_ROLE}}/g, staff?.role || 'N/A')
      .replace(/{{STAFF_MESSAGE}}/g, staff?.messageReq || 'N/A')
      .replace(/{{STAFF_STATUS}}/g, staff?.status || (action === 'approved' ? 'Approved' : 'Rejected'))
      .replace(/{{ACTION_BY}}/g, adminInfo.fullName)
      .replace(/{{ACTION_BY_EMAIL}}/g, adminInfo.email)
      .replace(/{{ACTION_DATE}}/g, adminInfo.issuedAt);

    const subject = `Your Staff Has Been ${action.charAt(0).toUpperCase() + action.slice(1)} - uvMart`;

    await mailOptions(receiverEmail, subject, customizedHtml);
    console.log(`✅ ${action.charAt(0).toUpperCase() + action.slice(1)} Staff email sent to:`, receiverEmail);

  } catch (error) {
    console.error(`❌ Error sending ${action} email:`, error);
    throw new Error(`Failed to send ${action} email`);
  }
}