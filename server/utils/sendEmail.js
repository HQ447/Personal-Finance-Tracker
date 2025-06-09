import nodemailer from "nodemailer";

export const sendBudgetExceededEmail = async ({
  to,
  category,
  spent,
  budget,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: `"Personal Finance Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Budget Alert: ${category} exceeded!`,
      html: `
        <h3>Budget Exceeded</h3>
        <p>You have spent <strong>$${spent}</strong> in <strong>${category}</strong> category.</p>
        <p>Your set budget was <strong>$${budget}</strong>.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
  }
};
