import React, { useState } from 'react';
import { Bill } from '@/types/Bill';

interface BillFormProps {
    onUpdate: (bill: Bill) => void;
}

const BillForm: React.FC<BillFormProps> = ({ onUpdate }) => {
    const [bill, setBill] = useState<Bill>({ id: '', name: '', amount: 0, dueDate: new Date() });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(bill);
        setBill({ id: '', name: '', amount: 0, dueDate: new Date() }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={bill.name}
                onChange={(e) => setBill({ ...bill, name: e.target.value })}
                placeholder="Bill Name"
                required
            />
            <input
                type="number"
                value={bill.amount}
                onChange={(e) => setBill({ ...bill, amount: Number(e.target.value) })}
                placeholder="Amount"
                required
            />
            <input
                type="date"
                value={bill.dueDate.toISOString().split('T')[0]} // Format date for input
                onChange={(e) => setBill({ ...bill, dueDate: new Date(e.target.value) })}
                required
            />
            <button type="submit">Save Bill</button>
        </form>
    );
};

export default BillForm;
