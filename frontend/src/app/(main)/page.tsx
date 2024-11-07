"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { rubik } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Card } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import LaserBeam from '@/components/ui/laserbeam'
import { containerVariants } from '@/lib/anims'

const Home = () => {

  return (
    <AnimatePresence>
      <motion.div 
        className='flex flex-col w-full h-full gap-y-10'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className='flex flex-col w-full h-full gap-y-10'>
          <h1 className='text-4xl font-bold'>Start page</h1>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
