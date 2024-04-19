import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request){
  await dbConnect()
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if(!user){
    return Response.json(
        {
          success:false,
          message: "User is Not Logged In."
        },{status:500}
      )
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user =   
  } catch (error) {
    return Response.json(
        {
          success:false,
          message: "Error in catch Part of get Messages."
        },{status:500}
      )
  }
}