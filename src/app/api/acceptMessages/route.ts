import dbConnect from "@/lib/dbConnect";
import { User, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";

export async function POST(request: Request){
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if(!session || !session?.user){
    return Response.json(
        {
          success:false,
          message: "Not Authenticated"
        },{status:401}
      )
  }
  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findById(
          userId,
          {isAcceptingMessage : acceptMessages},
          {new : true}
        )
    if(!updatedUser){
      return Response.json(
        {
          success:false,
          message: "Updated User Not Found."
        },{status:404}
      )
    }
    return Response.json(
        {
          success:true,
          message: "Message Acceptance status updated Successfully."
        },{status:200}
    )
  } catch (error) {
    return Response.json(
        {
          success:false,
          message: "Failed to update User status to accept Messages."
        },{status:500}
      )
  }
}


export async function GET(request: Request){
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if(!session || !session?.user){
    return Response.json(
        {
          success:false,
          message: "Not Authenticated"
        },{status:401}
      )
  }
  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if(!foundUser){
      return Response.json(
        {
          success:false,
          message: "User not found."
        },{status:404}
      )
    }
    return Response.json(
        {
          success:true,
          isAcceptingMessages: foundUser.isAcceptingMessage
        },{status:200}
      )
  } catch (error) {
    return Response.json(
        {
          success:false,
          message: "Something went wrong getting message accepting status."
        },{status:500}
      )
  }
}