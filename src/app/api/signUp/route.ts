import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import exp from "constants";

export async function POST(request: Request){
  await dbConnect();
  try {
    const {username, email, password} = await request.json();
    const existingUserVerifiedByUsername = await UserModel.
      findOne({
        username,
        isVerified:true
      })

    if(existingUserVerifiedByUsername){
      return Response.json({
        success: false,
        message:"User already Exists."
      },{status:400})
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({email});
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

    if(existingUserVerifiedByEmail){

    }else {
      const hashedPassword = await bcrypt.hash(password,10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1)

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified:false,
        isAcceptingMessage: true,
        messages: []
      })
      await newUser.save();
    }

    //Send Verification email
    await sendVerificationEmail(email, username, verifyCode)
  } catch (error) {
    console.log("Error in signUp user",error);
    return Response.json(
      {
        success:false,
        message:"Error in Registering user"
      },
      {
        status:500
      }
    )
  }
}