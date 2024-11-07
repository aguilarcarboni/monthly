"use client"
import React from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full h-fit'>
        <Link href="/" className='cursor-pointer'>
          <div className='flex w-10 h-10 bg-primary rounded-full items-center justify-center'></div>
        </Link>
        <Navbar/>
    </div>
  )
}

export default Header