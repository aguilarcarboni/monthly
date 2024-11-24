import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import { BillController } from '../../../controllers/BillController'
import { Bill } from '@/types/Bill'
import { useToast } from '@/hooks/use-toast'
import { randomUUID } from 'crypto'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

type Props = {
    setBills: React.Dispatch<React.SetStateAction<Bill[] | null>>;
    setCreatingBill: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBill = ({ setBills, setCreatingBill }: Props) => {

    const { toast } = useToast();
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(100);
    const [dueDate, setDueDate] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [renewal, setRenewal] = useState<string>('');
    const [status, setStatus] = useState<string>('Pending');
    const [open, setOpen] = useState(false);

    async function handleCreateBill() {
                
        setCreatingBill(true);

        const today = new Date();

        const dueDateObj = new Date(dueDate);
        if (dueDateObj <= today) {
          toast({ title: "Error", description: "Due date must be in the future." });
          throw new Error("Due date must be in the future.");
        }

        const response = await BillController.findAll();
        if (response['status'] !== 'success') {
          toast({ title: "Error", description: "Failed to get bills." });
          throw new Error("Failed to get bills.");
        }

        console.log(response['content']);

        const bill_ids = response['content'].map((bill: Bill) => bill.id);
        const max_id = Math.max(...bill_ids);
    
        const bill: Bill = {
          id: (max_id + 1).toString(),
          name: name,
          amount: amount,
          dueDate: dueDate,
          paid: false,
          category: category,
          renewal: renewal,
          status: 'Pending'
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