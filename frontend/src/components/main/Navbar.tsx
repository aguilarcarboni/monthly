'use client'
import React from 'react'

import Link from "next/link"

import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'

const Navbar = () => {

    const { theme, setTheme } = useTheme()

    const { width, height } = useWindowDimensions();

    const locations = [
        {
          name:'About us',
          url: '/about-us'
        },
        {
            name: 'Contact',
            url: '/contact'
        },
      ]
      
  return (
    <>
        {width && height && width * 0.75 > height ? 
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

                    <NavigationMenuItem>
                        <div className='h-full w-full flex flex-col justify-center items-center gap-y-5'>
                            <div className='flex gap-x-5'>
                                <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                                    {theme === 'dark' ? <MoonIcon/> : <SunIcon/>}
                                </Button>
                            </div>
                        </div>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
            :
            <div className='w-full justify-end items-end flex flex-col gap-x-10'>
                <p className='text-sm text-end'></p>    
            </div>
        }
    </>
  )
}

export default Navbar
