"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants } from '@/lib/anims'
import { accessAPI } from '@/utils/api'

const Home = () => {

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await accessAPI('/database/interests', 'GET')
      setData(response);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <AnimatePresence>
      <motion.div 
        className='flex flex-col w-full h-full gap-y-10'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className='flex flex-col w-full h-full gap-y-10'>
          <h1 className='text-xl'>{data.map((interest: any) => interest.name).join(', ')}</h1>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
