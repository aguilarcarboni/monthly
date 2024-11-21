"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants } from '@/lib/anims'
import { BillController } from '../../../../controllers/BillController'
import { Bill } from '@/types/Bill'
import { ColumnDefinition, DataTable } from '@/components/misc/DataTable'
import { toast } from '@/hooks/use-toast'
import CreateBill from '@/components/bills/CreateBill'

const Home = () => {

  const [bills, setBills] = useState<Bill[] | null>(null);
  const [creatingBill, setCreatingBill] = useState(false);
  const [selection, setSelection] = useState<Bill | null>(null);

  const columns:ColumnDefinition<Bill>[] = [
    {
      header: 'ID',
      accessorKey: 'id'
    },
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Amount',
      accessorKey: 'amount'
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate'
    }
  ]

  // Fetch all bills on load and on creating bill
  useEffect(() => {
    
    async function fetchBills() {

      if (creatingBill) return;

      try {

        const response = await BillController.findAll();
        setBills(response['content']);

        // Reminder notification for due bills
        const dueBills = response['content'].filter((bill: Bill) => {
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

  const upcomingPayments = bills.filter(bill => new Date(bill.dueDate) > new Date());

  async function handleDeleteBill(bill: Bill | null) {
    if (!bill) return;
  }

  async function handleEditBill(bill: Bill | null) {
    if (!bill) return;
  }

  const rowActions = [
    {
      label: 'Delete',
      onClick: () => handleDeleteBill(selection)
    },
    {
      label: 'Edit',
      onClick: () => handleEditBill(selection)
    }
  ]

  return (
    <AnimatePresence mode="popLayout">
      <motion.div 
        className='flex flex-col w-full h-full gap-y-10'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className='flex items-center justify-between gap-y-4'>
          <h1 className='text-5xl font-semibold'>Bill Manager</h1>
          <CreateBill setBills={setBills} setCreatingBill={setCreatingBill} />
        </div>
        <DataTable data={bills} columns={columns} enableSelection setSelection={setSelection} enablePagination enableRowActions rowActions={rowActions}/>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
