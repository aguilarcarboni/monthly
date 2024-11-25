import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { BillController } from '../../utils/controllers/BillController'
import { Bill } from '@/lib/types/Bill'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

interface PayBillProps {
  bill: Bill | null;
  onClose: () => void;
}

const PayBill = ({ bill, onClose }: PayBillProps) => {
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!bill) return;

    // You can integrate payment gateway here
    try {
      const updatedBill = { ...bill, paid: true, status: 'paid' };
      const response = await BillController.updateBill(bill.id, updatedBill);

      if (response['status'] === 'success') {
        toast({ title: "Success", description: "Payment processed successfully." });
        onClose(); // Close the modal on success
      } else {
        toast({ title: "Error", description: response['message'] });
      }
    } catch (error) {
      toast({ title: "Error", description: "Payment failed. Please try again." });
    }
  };

  return (
    <Dialog open={bill !== null} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay Bill</DialogTitle>
        </DialogHeader>
        <div>
          <div className="mb-4">
            <label htmlFor="cardNumber">Card Number</label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter your card number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate">Expiry Date</label>
            <Input
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv">CVV</label>
            <Input
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="Enter CVV"
            />
          </div>
          <Button className="bg-green-500 text-white" onClick={handlePayment}>
            Update Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayBill;
