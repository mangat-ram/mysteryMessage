import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider(
      {
        id: "Credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type:"text", placeholder:"Email"},
          password: { label: "Password",type:"password"}
        },
        async authorize(credentials: any): Promise<any>{
          await dbConnect();
          try {
            const user = await UserModel.findOne({
              $or : [
                {email: credentials.identifier},
                {username: credentials.identifier}
              ]
            })

            if(!user){
              throw new Error("No user found with this Email.")
            }

            if(!user.isVerified){
              throw new Error("Please verify your account before login.");
            }

            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if(isPasswordCorrect){
              return user;
            }else{
              throw new Error("Incorrect Password");
            } 
          } catch (error: any) {
            throw new Error(error)
          } 
        }
      }
    )
  ],
  callbacks: {

  },
  pages: {
    signIn: 'signIn'
  },
  session: {
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}