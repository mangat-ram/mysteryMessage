import { signInSchemaVal } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const SignIn = () => {

  const router = useRouter();
  // const {username,password} = 
  const form = useForm<z.infer<typeof signInSchemaVal>>({
    resolver: zodResolver(signInSchemaVal)
  })

  return (
    <div>SignIn</div>
  )
}

export default SignIn