"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants } from '@/lib/anims'
import { BillController } from '../../../controllers/BillController'
import { Button } from '@/components/ui/button'
import { Bill } from '@/types/Bill'

const Home = () => {

  async function handleCreateBill() {

    const bill: Bill = {
      id: '1',
      name: 'Test Bill',
      amount: 100,
      dueDate: new Date().toISOString()
    }

    const response = await BillController.createBill(bill);
    console.log(response)

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
          <Button onClick={handleCreateBill}>Create Bill</Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
