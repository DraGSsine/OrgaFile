"use server";
import { Resend } from "resend";

const template = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Orgafile Waiting List</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #4F46E5; padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to Orgafile</h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-top: 0;">
                                Thank you for joining our waiting list! 🎉
                            </p>
                            <p style="font-size: 16px; line-height: 1.6; color: #333333;">
                                We're thrilled to have you on board. As a special thank you for your early interest, we're excited to offer you an exclusive discount when Orgafile launches.
                            </p>
                            <div style="background-color: #F3F4F6; border-radius: 6px; padding: 20px; margin: 30px 0; text-align: center;">
                                <p style="font-size: 18px; color: #374151; margin: 0;">Your Special Launch Discount:</p>
                                <h2 style="color: #4F46E5; font-size: 32px; margin: 10px 0;">10% OFF</h2>
                                <p style="font-size: 14px; color: #6B7280; margin: 0;">Valid when we launch</p>
                            </div>
                            <p style="font-size: 16px; line-height: 1.6; color: #333333;">
                                We'll keep you updated on our progress and let you know as soon as we're ready to launch.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                            <p style="font-size: 14px; color: #6B7280; margin: 0;">
                                © 2024 Orgafile. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
const resend = new Resend(process.env.RESEND_KEY);
export const sendEmail = async (email: string, name?: string) => {
  // check if the email is valid
  if (!email || !email.includes("@") || !email.includes("."))
    return { err: "Invalid email" };

  try {
    resend.emails.send({
      from: "no-reply@orgafile.com",
      to: email,
      subject: "Welcome to Orgafile Waiting List",
      html: template,
    });
    return { err: null };
  } catch (err) {
    console.error(err);
    return { err: "Failed to send email" };
  }
};
