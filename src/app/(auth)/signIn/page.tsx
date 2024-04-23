"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import axios,{AxiosError} from "axios";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";

const Page = () => {

  const [username,setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username,300);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username:"",
      email:"",
      password:""
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if(debouncedUsername){
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const res = await axios.get(`/api/checkUniqueUser?username=${debouncedUsername}`)
          setUsernameMessage(res.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error Checking Username"
          )
        } finally {
          setIsCheckingUsername(false);
        }
      }
    }
    checkUsernameUnique();
  }
  , [debouncedUsername])

  return (
    <div>Page</div>
  )
}

export default Page