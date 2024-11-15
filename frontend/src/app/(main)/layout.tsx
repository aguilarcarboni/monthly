'use client'

import Header from "@/components/main/Header"

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  
  return (
    <div className='h-full w-full flex flex-col p-5 gap-y-24'>
      <Header />
      <div className='h-full w-full'>
        {children}
      </div>
    </div>
  )
}