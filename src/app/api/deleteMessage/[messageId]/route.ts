import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function DELETE(request: Request, { params }:{params: {messageId:string}}){
  const messageId = params.messageId
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
  
  try {
    const updateRes = await UserModel.updateOne(
      {_id: user._id},
      {$pull: {messages : { _id: messageId }}}
    )

    if(updateRes.modifiedCount == 0){
      return Response.json(
        {
          success:false,
          message: "Message Not Found or Already deleted."
        },{status:404}
      )
    }

    return Response.json(
        {
          success:true,
          message: "Message deleted Successfully."
        },{status:200}
      )
  } catch (error) {
    return Response.json(
        {
          success:false,
          message: "Error on deleting Message!"
        },{status:500}
      )
  }
}