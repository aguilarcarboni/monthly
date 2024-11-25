"use client"
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {

  const {data: session} = useSession()

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center flex justify-center items-center gap-5 flex-col">
        <div className='flex gap-5 items-center'>
          <Image src="/assets/icons/money_with_wings.png" alt="Monthly Logo" width={75} height={75}/>
          <h1 className="text-7xl font-bold text-foreground">
            Monthly
          </h1>
        </div>
        <p className="text-2xl text-subtitle">
          Have your expenses work for you
        </p>
        <Button className='w-fit'>
          <Link href={!session || !session.user ? '/onboarding' : '/bills'}>
            {!session || !session.user ? 'Get Started' : 'My Bills'}
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Home
