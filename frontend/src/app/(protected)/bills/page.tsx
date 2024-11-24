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

  // Determine the status of a bill
  const updateStatus = (bill: Bill): string => {
    const today = new Date();
    const dueDate = new Date(bill.dueDate);
    if (bill.paid) {
      return "payed";
    } else if (dueDate < today) {
      return "overdue";
    } else {
      return "pending";
    }
  };

  const columns: ColumnDefinition<Bill>[] = [
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
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Renewal',
      accessorKey: 'renewal'
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell) => {
        const status = cell.getValue(); // Automatically infers the type
        let statusStyle = "";
        if (status === "payed") statusStyle = "bg-green-100 text-green-700";
        else if (status === "pending") statusStyle = "bg-yellow-100 text-yellow-700";
        else if (status === "overdue") statusStyle = "bg-red-100 text-red-700";
  
        return (
          <span className={`px-2 py-1 rounded-full text-sm font-bold ${statusStyle}`}>
            {String(status).toUpperCase()}
          </span>
        );
      },
    }
  ];  

  // Fetch all bills and update their statuses
  useEffect(() => {
    async function fetchBills() {
      if (creatingBill) return;

      try {
        const response = await BillController.findAll();
        const updatedBills = response["content"].map((bill: Bill) => ({
          ...bill,
          status: updateStatus(bill),
        }));

        setBills(updatedBills);

        // Reminder notification for due bills
        const dueBills = updatedBills.filter((bill: Bill) => bill.status === "overdue");
        if (dueBills.length > 0) {
          toast({ title: "Reminder", description: `${dueBills.length} bill(s) are overdue.` });
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast({ title: "Error", description: errorMessage });
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

  async function handlePayment(bill: Bill | null) {
    if (!bill) return;

    try {
      const response = await BillController.initiatePayment(bill.id);
      if (response['status'] === 'success') {
        toast({ title: "Success", description: "Payment processed successfully." });
        // Optionally refresh the bills after payment
        setBills(await BillController.findAll());
      } else {
        throw new Error(response['message']);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast({ title: "Error", description: errorMessage });
    }
  }

  const rowActions = [
    {
      label: 'Delete',
      onClick: () => handleDeleteBill(selection)
    },
    {
      label: 'Edit',
      onClick: () => handleEditBill(selection)
    },
    {
      label: 'Pay',
      onClick: () => handlePayment(selection)
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
