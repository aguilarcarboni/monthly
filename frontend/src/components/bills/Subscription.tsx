import React, { useState } from 'react';
import { Bill } from '@/lib/types/Bill';
import { BillController } from '@/utils/controllers/BillController';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from '../ui/input';
import { toast } from "@/hooks/use-toast";

interface SubscriptionProps {
    bill: Bill;
    onClose: () => void;
}

const SubscriptionComponent = ({ bill, onClose }: SubscriptionProps) => {
    const [isAlertEnabled, setIsAlertEnabled] = useState(bill.isAlertEnabled);
    const [alertDaysBefore, setAlertDaysBefore] = useState(bill.alertDaysBefore);

    const handleSave = async () => {
        const today = new Date();
        const dueDate = new Date(bill.dueDate);
        const timeDifference = dueDate.getTime() - today.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Check if the bill is overdue
        if (bill.status === "overdue") {
            toast({ title: "Error", description: "Overdue bills cannot have their alerts changed." });
            return; // Prevent saving
        }

        // Prevent setting alert days to 0
        if (alertDaysBefore <= 0) {
            toast({ title: "Warning", description: "Alert days must be greater than 0." });
            setAlertDaysBefore(1); // Reset to 1 if the user tries to set it to 0
            return; // Prevent saving
        }

        if (daysDifference <= 1 && alertDaysBefore > 1) {
            toast({ title: "Warning", description: "You cannot set alert days to more than 1 when the due date is within one day." });
            setAlertDaysBefore(1); // Reset to 1 if the user tries to set it to more
            return; // Prevent saving
        }

        const updatedBill = { ...bill, isAlertEnabled, alertDaysBefore };
        await BillController.updateBill(bill.id, updatedBill);
        onClose(); // Close the modal after saving
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{bill.name}</DialogTitle>
                </DialogHeader>
                <div>
                    <label>
                        Alert days before due date:
                        <Input 
                            type="number"
                            value={alertDaysBefore}
                            onChange={(e) => setAlertDaysBefore(Number(e.target.value))}
                        />
                    </label>
                    <div className="mt-4 flex justify-center">
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionComponent;
