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

            {session && session.user ? (
                <>
                    <NavigationMenuItem key='bills'>
                        <Link href={'/bills'} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                                My bills
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem key='charts'>
                        <Link href='/charts' legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                                Charts
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </>
            ) : (
                <>
                    <NavigationMenuItem key='onboarding'>
                        <Link href='/onboarding' legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                                Getting started
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </>
            )}

            <Account/>

        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
