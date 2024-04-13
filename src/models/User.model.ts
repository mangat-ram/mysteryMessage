import mongoose, {Schema,Document} from "mongoose";

export interface MessageSchemaType extends Document{ 
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<MessageSchemaType> = new Schema(
  {
    content:{
      type:String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  }
)

export interface UserSchemaType extends Document{
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: MessageSchemaType[] 
}

const UserSchema: Schema<UserSchemaType> = new Schema(
  {
    username:{
      type:String,
      required:[true, "Username is required"],
      unique:true,
      trim:true
    },
    email: {
      type:String,
      required:[true, "email is required"],
      unique:true,
      match:[/.+\@.+\..+/, "Please use a Valid email Address."]
    },
    password: {
      type:String,
      required:[true, "Password is required"],
    },
    verifyCode: {
      type:String,
      required:[true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
      type:Date,
      required:[true, "Verify Code is required"],
    },
    isVerified: {
      type:Boolean,
      default:false
    },
    isAcceptingMessage: {
      type:Boolean,
      default:false
    },
    messages:[MessageSchema]
  }
)

const UserModel = (mongoose.models.User as mongoose.Model<UserSchemaType>) || 
  (mongoose.model<UserSchemaType>("User",UserSchema))

export default UserModel;