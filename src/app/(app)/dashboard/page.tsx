"use client";

import { useToast } from "@/components/ui/use-toast";
import { MessageSchemaType } from "@/models/User.model"
import { acceptMessagesSchemaVal } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form";

const Dashboard = () => {

  const [messages,setMessages] = useState<MessageSchemaType[]>([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isSwitchLoading,setIsSwitchLoading] = useState(false)
  const { toast } = useToast();

  const handleDeleteMsg = (messageId : string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const {data: session} = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchemaVal)
  })

  const {register,watch,setValue} = form;

  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const res = await axios.get('/api/acceptMessages')
      setValue('acceptMessages',res.data.isAcceptingMessage)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description:"Failed to fetch message Settings",
        variant:"destructive"
      })
    }finally{
      setIsSwitchLoading(false)
    }
  },[setValue])

  const fetchMessages = useCallback( async (refresh:boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const res = await axios.get<ApiResponse>('/api/getMessages')
      setMessages(res.data.messages || [])
      if(refresh){
        toast({
          title:"Refreshed Messages",
          description:"Showing latest messages",
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description:"Failed to fetch message Settings",
        variant:"destructive"
      })
    }finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading, setMessages])

  useEffect(() => {
    if(!session || !session.user) return;
    fetchMessages()
    fetchAcceptMessages()
  },[session,setValue,fetchAcceptMessages,fetchMessages])

  

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard