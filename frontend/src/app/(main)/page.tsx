"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants } from '@/lib/anims'
import { BillController } from '../../../controllers/BillController'
import { Button } from '@/components/ui/button'
import { Bill } from '@/types/Bill'
import { DataTable } from '@/components/misc/DataTable'
import { Toaster } from '@/components/ui/toaster'
import { PlusIcon } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

// Add a function to filter and display upcoming payments
function getUpcomingPayments(bills: Bill[]) {
  const today = new Date();
  return bills.filter(bill => new Date(bill.dueDate) > today);
}

const Home = () => {
  const [bills, setBills] = useState<Bill[] | null>(null);
  const [creatingBill, setCreatingBill] = useState(false);
  const [index, setIndex] = useState(1);
  const [newBill, setNewBill] = useState({ name: '', amount: 0, dueDate: '' });

  async function handleCreateBill() {
    const today = new Date();
    const dueDate = new Date(newBill.dueDate);

    if (dueDate <= today) {
      toast({ title: "Error", description: "Due date must be in the future." });
      return;
    }

    setCreatingBill(true);

    const bill: Bill = {
      id: index.toString(),
      name: newBill.name,
      amount: newBill.amount,
      dueDate: newBill.dueDate
    }

    try {
      const response = await BillController.createBill(bill);
      if (response['status'] !== 'success') {
        throw new Error('Failed to create bill');
      }
      toast({ title: "Success", description: "Bill created successfully." });
      setBills(prevBills => prevBills ? [...prevBills, bill] : [bill]);
      setIndex(prevIndex => prevIndex + 1);
      setNewBill({ name: '', amount: 0, dueDate: '' }); // Reset form
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    } finally {
      setCreatingBill(false);
    }
  }

  useEffect(() => {
    async function fetchBills() {
      if (creatingBill) return;
      try {
        const response = await BillController.findAll();
        setBills(response['content']['content']);
        setIndex(response['content']['content'].length + 1);

        // Reminder notification for due bills
        const dueBills = response['content']['content'].filter((bill: Bill) => {
          const dueDate = new Date(bill.dueDate);
          const today = new Date();
          return dueDate <= today;
        });

        if (dueBills.length > 0) {
          toast({ title: "Reminder", description: `${dueBills.length} bill(s) are due.` });
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch bills." });
      }
    }
    fetchBills();
  }, [creatingBill]);

  if (!bills) {
    return <h1 className='text-2xl font-bold'>Loading bills...</h1>
  }

  const upcomingPayments = getUpcomingPayments(bills);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div 
        className='flex flex-col w-full h-full gap-y-10'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <DataTable data={bills} />
        <div className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Bill Name"
            value={newBill.name}
            onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
            className='input'
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBill.amount}
            onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) })}
            className='input'
          />
          <input
            type="date"
            placeholder="Due Date"
            value={newBill.dueDate}
            onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
            className='input'
          />
          <Button onClick={handleCreateBill} className='flex w-fit gap-2'>
            <PlusIcon className='w-4 h-4' />
            Add Bill
          </Button>
        </div>
        <h2 className='text-xl font-bold'>Upcoming Payments</h2>
        <DataTable data={upcomingPayments} />
        <Toaster />
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
