"use client";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="px-3 py-2 text-xl rounded-lg bg-amber-700 text-white" onClick={() => signIn()}>Sign in</button>
    </>
  )
}