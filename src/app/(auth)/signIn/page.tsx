"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { useDebounceValue } from "usehooks-ts";

import React, { useState } from 'react'

const Page = () => {

  const [username,setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceValue(username,300);

  return (
    <div>Page</div>
  )
}

export default Page