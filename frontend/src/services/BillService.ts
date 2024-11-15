import { Bill } from '@/types/Bill';
import { BillRepository } from '../repositories/BillRepository';

export class BillService {
    
    static async createBill(bill: Bill & { id: number }) {
        // Talk with API
        return await BillRepository.save(bill);
    }

    static async getBills() {
        return await BillRepository.findAll();
    }

    // Additional methods for update, delete, etc.
}