"use client"
import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Calendar } from 'lucide-react'

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full h-fit'>
      <Button variant='ghost' className='flex items-center gap-2 hover:bg-transparent hover:text-primary'>
        <Link href="/" className='cursor-pointer'>
          <Calendar/>
        </Link>
      </Button>
      <Navbar/>
    </div>
  )
}

export default Header