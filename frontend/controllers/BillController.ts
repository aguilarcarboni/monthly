import { accessAPI } from "@/utils/api";

export class BillController {

    static async createBill(bill: any & { id: number }) {

        bill = {
            'id': 1
        }
        
        const response = await accessAPI('/bill_service/createBill', 'POST', bill);
        if (response['status'] !== 'success') {
            throw new Error('Failed to create bill');
        }
        return response;
    }

}