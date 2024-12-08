import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import { BillController } from '../../utils/controllers/BillController'
import { Bill } from '@/lib/types/Bill'
import { useToast } from '@/hooks/use-toast'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'

const categories = ['Entertainment', 'Membership', 'Studies', 'Work', 'Services'];
const renewalOptions = ['One Time Payment', 'Weekly', 'Bi Weekly', 'Monthly', 'Every 3 Months', 'Every 6 Months', 'Yearly'];

type Props = {
    setBills: React.Dispatch<React.SetStateAction<Bill[] | null>>;
    setCreatingBill: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBill = ({ setBills, setCreatingBill }: Props) => {

    const { toast } = useToast();
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(100);
    const [dueDate, setDueDate] = useState<string>('');
    const [category, setCategory] = useState<string>('Select a category');
    const [renewal, setRenewal] = useState<string>('Select a renewal option');
    const [open, setOpen] = useState(false);

    async function handleCreateBill() {
        setCreatingBill(true);

        const today = new Date();
        const dueDateObj = new Date(dueDate);

        const response = await BillController.findAll();
        if (response['status'] !== 'success') {
          toast({ title: "Error", description: "Failed to get bills." });
          throw new Error("Failed to get bills.");
        }

        const bill_ids = response['content'].map((bill: Bill) => bill.id);
        const max_id = bill_ids.length > 0 ? Math.max(...bill_ids) : 0;
    
        const bill: Bill = {
            id: (max_id + 1).toString(),
            name: name,
            amount: amount,
            dueDate: dueDate,
            paid: false,
            category: category,
            renewal: renewal,
            status: 'pending',
            isAlertEnabled: false,
            alertDaysBefore: 3,
        }
    
        try {
          const response = await BillController.createBill(bill);
          if (response['status'] !== 'success') {
            throw new Error('Failed to create bill');
          }

          toast({ title: "Success", description: "Bill created successfully." });

          setBills(prevBills => prevBills ? [...prevBills, bill] : [bill]);
          setName('');
          setAmount(0);
          setDueDate('');
          setCategory('Select a category');
          setRenewal('Select a renewal option');
          setOpen(false);
          setOpen(false);
          setOpen(false);
    
        } catch (error: any) {
          toast({ title: "Error", description: error.message });
        } finally {
          setCreatingBill(false);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className='flex w-fit gap-2'>
                <PlusIcon className='w-4 h-4' />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create New Bill</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-4'>
                <Input
                    type="text"
                    placeholder="Bill Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input'
                />
                <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className='input'
                />
                <Input
                    type="date"
                    placeholder="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className='input'
                />
                    <DropdownMenu>
                        <DropdownMenuTrigger className='input text-left'>
                            {category}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='text-left'>
                            {categories.map((cat) => (
                                <DropdownMenuItem key={cat} onClick={() => setCategory(cat)}>
                                    {cat}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='input text-left'>
                            {renewal}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='text-left'>
                            {renewalOptions.map((option) => (
                                <DropdownMenuItem key={option} onClick={() => setRenewal(option)}>
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={handleCreateBill} className='flex w-fit gap-2'>
                        <PlusIcon className='w-4 h-4' />
                        Add Bill
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBill