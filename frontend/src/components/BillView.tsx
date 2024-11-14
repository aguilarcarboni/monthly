import React, { useState, useEffect } from 'react';
import BillForm from './BillForm';
import { BillService } from '../services/BillService';
import { Bill } from '@/types/Bill';

const BillView = () => {
    const [bills, setBills] = useState<Bill[]>([]);

    useEffect(() => {
        const fetchBills = async () => {
            const fetchedBills = await BillService.getBills();
            setBills(fetchedBills);
        };
        fetchBills();
    }, []);

    const handleBillUpdate = (updatedBill: Bill) => {
        setBills((prevBills) => prevBills.map(bill => bill.id === updatedBill.id ? updatedBill : bill));
    };

    return (
        <div>
            <h1>Bill Management</h1>
            <BillForm onUpdate={handleBillUpdate} />
            <ul>
                {bills.map(bill => (
                    <li key={bill.id}>{bill.name} - {bill.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default BillView;
