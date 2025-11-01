import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";

const GenerateAndSendVerificationEmail = async (user) => {
  try {
    const { _id, email, fullName } = user; // Extract necessary fields from the user object

    const verificationToken = jwt.sign({ id: _id }, process.env.EMAIL_VERIFICATION_SECRET, {
      expiresIn: process.env.EMAIL_VERIFICATION_EXPIRY,
    });

    const verificationLink = `${process.env.DOMAIN}/api/v1/users/verify-email/${_id}/${verificationToken}`;

    // Create a transporter using Gmail's service
    const transporter = createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Define mail options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `${fullName}, please verify your email by clicking on the following link: ${verificationLink}`,
      html: `<h1>${fullName}</h1><br/>
        <p>Please verify your email by clicking on the following link:
        <a href="${verificationLink}">Verify Email</a></p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error.message}`);
  }
};

// Ensure proper export
export default GenerateAndSendVerificationEmail;
