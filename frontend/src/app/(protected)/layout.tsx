'use client'

import { useSession } from "next-auth/react"
import "../globals.css"
import { Lock } from "lucide-react"
import Account from "@/components/misc/Account"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const {data:session} = useSession()

  if (!session || !session.user) {
    return <div className="h-full w-full flex flex-col gap-5 justify-center items-center">
      <Lock className="w-32 h-32"/>
      <p className="text-7xl font-bold">Oops!</p>
      <p className="text-lg">Login to view your bills.</p>
      <Account/>
    </div>
  }

  return (
    <div className="h-full w-full">
      {children}
    </div>
  )
}
