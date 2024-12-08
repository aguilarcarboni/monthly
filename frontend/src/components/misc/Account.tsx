import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import { navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
}

const Account = ({}: Props) => {
  
  const {data:session} = useSession()

  return (
    <div className='h-fit w-full flex flex-col justify-center items-center'>
      {session?.user ? (
        <Popover>
          <PopoverTrigger asChild className='w-fit h-full'>
            <Button variant='ghost' className='flex flex-col hover:bg-muted gap-y-5 w-full h-full hover:bg-agm-black/5'>
              <div className='flex w-full text-agm-dark-blue h-full items-center gap-x-5'>

                {session.user.name ?
                  <p className='text-sm'>{session?.user.name}</p>
                  :
                  <p className='text-sm'>Anonymous</p>
                }

                {session.user.image ?
                  <img className='rounded-full w-10 h-10' src={session?.user.image!} referrerPolicy="no-referrer" alt={'Missing'}/>
                  :
                  <div className='w-10 h-10 rounded-full bg-primary'></div>
                }
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full h-full flex justify-center items-center">
            <div className='w-fit h-full flex text-agm-dark-blue justify-center items-center'>
              <Button onClick={() => signOut({callbackUrl: '/'}) } className="flex">
                <p className="text-sm">Sign out</p>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className='flex w-full gap-x-5 justify-center items-center'>
          <Button className="flex w-fit h-full justify-center items-center">
            <Link href='/signin'>
              <p className="text-sm">Sign in</p>
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default Account