import { resend } from "./config.js";
import {
  verificationTokenEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
} from "./email-templates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "AZUREHUB <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email Address Now",
      html: verificationTokenEmailTemplate.replace(
        "{verificationToken}",
        verificationToken
      ),
    });
  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error("Error sending verification email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "AZUREHUB <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to our company",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    });
  } catch (error) {
    console.log("error sending welcome email", error);
  }
};

export const sendPasswordResetEmail = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: "AZUREHUB <onboarding@resend.dev>",
      to: [email],
      subject: "Your Password Reset OTP",
      html: `
        <p>Your password reset code is:</p>
        <h2 style="letter-spacing: 3px;">${otp}</h2>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    if (response.error) {
      console.error("Resend API error:", response.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error sending OTP email:", err);
    return false;
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "AZUREHUB <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset Was Successful",
      html: `Your password was reset successfully`,
    });
  } catch (error) {
    console.log("error sending password reset successful email", error);
  }
}
