"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants } from '@/lib/anims'
import { BillController } from '../../../controllers/BillController'
import { Button } from '@/components/ui/button'
import { Bill } from '@/types/Bill'
import { DataTable } from '@/components/misc/DataTable'
import { PlusIcon } from 'lucide-react'

const Home = () => {

  const [bills, setBills] = useState<Bill[] | null>(null);
  const [creatingBill, setCreatingBill] = useState(false);
  const [index, setIndex] = useState(1);

  async function handleCreateBill() {

    setCreatingBill(true);

    const bill: Bill = {
      id: index.toString(),
      name: 'Bill ' + Math.random().toString(36).substring(2, 15),
      amount: 100,
      dueDate: new Date().toISOString()
    }

    const response = await BillController.createBill(bill);
    if (response['status'] != 'success') {
      setCreatingBill(false);
      return;
    }

    setCreatingBill(false);
  }

  useEffect(() => {
    async function fetchBills() {

      if (creatingBill) return;
      const response = await BillController.findAll();
      setBills(response['content']['content']);
      setIndex(response['content']['content'].length + 1);

    }
    fetchBills();
  }, [creatingBill]);

  if (!bills) {
    return <h1 className='text-2xl font-bold'>Loading bills...</h1>
  }

  return (
    <AnimatePresence>
      <motion.div 
        className='flex flex-col w-full h-full gap-y-10'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <DataTable data={bills} />
        <Button onClick={handleCreateBill} className='flex w-fit gap-2'>
          <PlusIcon className='w-4 h-4' />
          Add Bill
        </Button>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
