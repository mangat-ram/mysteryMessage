import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse>{
  try {
    await resend.emails.send({
      
    });
    return {
      success:true,
      message:"Verification Email Sent Successfully."
    }
  } catch (emailError) {
    console.log("Error Sending Verification Email.",emailError);
    return {
      success:false,
      message:"Failed to Send verification Email."
    }
  }
}