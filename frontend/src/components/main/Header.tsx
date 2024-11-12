"use client"
import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full h-fit'>
        <Link href="/" className='cursor-pointer'>
          <p className='text-3xl font-bold'>Software Engineering Project</p>
        </Link>
        <Navbar/>
    </div>
  )
}

export default Header