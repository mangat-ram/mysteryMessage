import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(request: Request, { params }:{
  params: {messageId:string}
}){
  await dbConnect()
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if(!session || !session.user){
    return Response.json(
        {
          success:false,
          message: "Not Authenticated."
        },{status:500}
      )
  }
  
  
}