import { Bill } from "@/types/Bill";
import { accessAPI } from "@/utils/api";

export class BillController {

    static async createBill(bill: Bill) {
        
        const response = await accessAPI('/bill_service/create', 'POST', {'bill': bill});
        if (response['status'] !== 'success') {
            throw new Error('Failed to create bill');
        }
        return response;
    }

}