"use client"
import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full h-fit'>
      <Button variant='ghost' className='flex items-center gap-2'>
        <Link href="/" className='cursor-pointer'>
          <p className='text-3xl font-bold'>Bill Tracker</p>
        </Link>
      </Button>
      <Navbar/>
    </div>
  )
}

export default Header