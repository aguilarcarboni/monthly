'use client'
import React from 'react'

import Link from "next/link"

import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Account from '../misc/Account'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const Navbar = () => {

    const {data: session} = useSession()

  return (
    <NavigationMenu>
        <NavigationMenuList>

            <NavigationMenuItem key='home'>
                <Link href='/' legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                       Home
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

            <NavigationMenuItem key='bills'>
                <Link href={!session || !session.user ? '/onboarding' : '/bills'} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                        {!session || !session.user ? 'Onboarding' : 'My Bills'}
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

            <Account/>

        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
