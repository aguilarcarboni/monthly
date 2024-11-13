"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants } from '@/lib/anims'
import { accessAPI } from '@/utils/api'
import { useToast } from '@/hooks/use-toast'

const Home = () => {

  const [data, setData] = useState<any>(null);

  const {toast} = useToast()

  useEffect(() => {
    async function fetchData() {
      const response = await accessAPI('/database/read', 'POST', {
        table: 'interests',
        params: {}
      })
      if (response['status'] !== 'success') {
        toast({
          title: 'Error',
          description: response['message'],
        })
        throw new Error(response['message'])
      }
      setData(response['content']);
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
          {data.map((interest: any) => (
            <div key={interest.id}>
              <h1>{interest.name}</h1>
              <p>{interest.keywords}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
