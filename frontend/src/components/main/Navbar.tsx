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
import { Button } from '../ui/button'
import Account from '../misc/Account'

const Navbar = () => {

    const locations = [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'Getting started',
            url: '/onboarding'
        },
        {
            name: 'Bills',
            url: '/bills'
        },
        {
            name: 'Contact',
            url: '/contact'
        },
    ]

  return (
    <NavigationMenu>
        <NavigationMenuList>

            {locations.map((location) => (
                <NavigationMenuItem key={location.name}>
                    <Link href={location.url} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                        {location.name}
                    </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            ))}
            <Account/>

        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
