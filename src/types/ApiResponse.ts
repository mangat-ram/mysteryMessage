import { MessageSchemaType } from "@/models/User.model";

export interface ApiResponse{
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean; 
  messages?: Array<MessageSchemaType>;
}