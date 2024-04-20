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
  if(!session || !session.user){
    return Response.json(
        {
          success:false,
          message: "Not Authenticated."
        },{status:500}
      )
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate(
      [
        {$match:{id:userId}},
        {$unwind: '$messages'},
        {$sort: {'$messages.createdAt':-1}},
        {$group:{_id:'$_id', messages:{$push:'$messages'}}}
      ]
    )
    
    if(!user || user.length === 0){
      return Response.json(
        {
          success:false,
          message: "User Not Found."
        },{status:404}
      )
    }

    return Response.json(
        {
          success:true,
          messages: user[0].messages
        },
        {status:200}
      )

  } catch (error) {
    return Response.json(
        {
          success:false,
          message: "Error in catch Part of get Messages."
        },{status:500}
      )
  }
}