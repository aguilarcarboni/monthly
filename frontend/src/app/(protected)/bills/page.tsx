"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants } from '@/lib/anims'
import { BillController } from '../../../utils/controllers/BillController'
import { Bill } from '@/lib/types/Bill'
import { ColumnDefinition, DataTable } from '@/components/misc/DataTable'
import { toast } from '@/hooks/use-toast'
import CreateBill from '@/components/bills/CreateBill'
import PayBill from '@/components/bills/PayBill'
import SubscriptionComponent from '@/components/bills/Subscription';

const Home = () => {
  const [bills, setBills] = useState<Bill[] | null>(null);

  const [creatingBill, setCreatingBill] = useState(false);
  const [deletingBill, setDeletingBill] = useState(false);

  const [selection, setSelection] = useState<Bill | null>(null);
  const [isPayBillOpen, setIsPayBillOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  // Determine the status of a bill
  const updateStatus = (bill: Bill): string => {
    const today = new Date();
    const dueDate = new Date(bill.dueDate);
    if (bill.paid) {
      return "paid";
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
        if (status === "paid") statusStyle = "bg-green-100 text-green-700";
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
      if (creatingBill || deletingBill || isPayBillOpen) return;

      try {
        const response = await BillController.findAll();
        const updatedBills = response["content"].map((bill: Bill) => ({
          ...bill,
          status: updateStatus(bill),
        }));

        // Sort bills by due date
        const sortedBills = [...updatedBills].sort((a, b) => 
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

        setBills(sortedBills);

        // Reminder notification for overdue bills
        const dueBills = updatedBills.filter((bill: Bill) => bill.status === "overdue");
        if (dueBills.length > 0) {
          toast({ title: "Reminder", description: `${dueBills.length} bill(s) are overdue.` });
        }

        // Check for bills due in the next week
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        
        const billsDueNextWeek = updatedBills.filter((bill: Bill) => {
          const dueDate = new Date(bill.dueDate);
          return !bill.paid && dueDate > today && dueDate <= nextWeek;
        });

        if (billsDueNextWeek.length > 0) {
          toast({ 
            title: "Upcoming Bills", 
            description: `${billsDueNextWeek.length} bill(s) are due in the next week.` 
          });
        }

        // Generate reminders for bills that are not overdue
        updatedBills.forEach((bill: Bill) => {
          if (bill.status !== "overdue") {
            const dueDate = new Date(bill.dueDate);
            const alertDate = new Date(dueDate);
            alertDate.setDate(alertDate.getDate() - bill.alertDaysBefore);

            if (alertDate.toDateString() === today.toDateString()) {
              toast({ title: "Reminder", description: `${bill.name} is due in ${bill.alertDaysBefore} day(s).`});
            }
          }
        });

      } catch (error) {
        const errorMessage = (error as Error).message;
        toast({ title: "Error", description: errorMessage });
      }
    }

    fetchBills();
  }, [creatingBill, deletingBill, isPayBillOpen]);

  async function handleDeleteBill(bill: Bill | null) {
    console.log(bill);
    if (!bill) return;

    try {
      setDeletingBill(true);
      await BillController.deleteBill(bill.id);
      setDeletingBill(false);
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast({ title: "Error", description: errorMessage });
    }
  }

  const handleEditAlert = (row: any) => {
    const selectedBill = row; // Assuming row contains the bill object
    setSelection(selectedBill);
    setIsSubscriptionOpen(true); // Open the Subscription modal
  };

  async function handlePayment(bill: Bill | null) {
    if (!bill) return;
    setSelection(bill);
    setIsPayBillOpen(true); // Open the PayBill modal
  }

  const rowActions = [
    {
      label: 'Delete',
      onClick: (row: any) => handleDeleteBill(row)
    },
    {
      label: 'Pay',
      onClick: (row: any) => handlePayment(row)
    },
    {
      label: 'Edit Alert',
      onClick: (row: any) => handleEditAlert(row)
    }
  ];

  if (!bills) {
    return <h1 className='text-2xl font-bold'>Loading bills...</h1>
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div 
        className='flex flex-col w-full h-full gap-y-10'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className='flex items-center justify-between gap-y-4'>
          <h1 className='text-5xl font-semibold'>Check out your bills...</h1>
          <CreateBill setBills={setBills} setCreatingBill={setCreatingBill} />
        </div>

        {bills.length === 0 && (
          <h1 className='text-2xl font-bold'>No bills found. Add a bill to get started.</h1>
        )}

        <DataTable
          data={bills} 
          columns={columns}
          enablePagination enableRowActions rowActions={rowActions} 
        />
        
        {isSubscriptionOpen && selection && (
          <SubscriptionComponent bill={selection} onClose={() => setIsSubscriptionOpen(false)} />
        )}

        {isPayBillOpen && (
          <PayBill bill={selection} onClose={() => setIsPayBillOpen(false)} />
        )}

      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
