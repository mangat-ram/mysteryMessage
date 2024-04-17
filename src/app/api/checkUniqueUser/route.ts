import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { z } from "zod";
import { usernameVal } from "@/schemas/signUpSchema";

const UserNameQuerySchema = z.object({
  username: usernameVal
})

export async function GET(request: Request){
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get('username')
    }
    //validate with zod
    const result = UserNameQuerySchema.safeParse(queryParam);
    if(!result.success){
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: usernameErrors?.length > 0 ? usernameErrors.join(', '): 'invalid query Parameters'
        },{status: 400}
      )
    }

    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({username,isVerified:true});
    if(existingVerifiedUser){
      return Response.json(
        {
          success: false,
          message: "username is already taken!"
        },{status: 400}
      )
    }
    return Response.json(
        {
          success: false,
          message: "username is available"
        },{status: 400}
      )

  } catch (error) {
    console.error("Error Checking username ::",error);
    return Response.json(
      {
        success: false,
        message: "Error checking Username."
      },
      { status: 500 }
    )
  }
}