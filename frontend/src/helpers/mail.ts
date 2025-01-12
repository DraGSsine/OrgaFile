import { Resend } from "resend";
import axios from "axios";

export const sendEmail = async (email: string, name?: string) => {
  try {
    const resend = new Resend("re_6jTmAMxX_9KYBbxJcQpp9zB2BPqseobEw");

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ouchen606@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
    return { err: null };
  } catch (err) {
    console.error(err);
    return { err };
  }
};
