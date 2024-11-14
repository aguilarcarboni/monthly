let bills: any[] = []; // This would typically be a database

export class BillRepository {
    static async save(bill: { id: number; name: string; amount: number }) {
        bills.push(bill);
        return bill;
    }

    static async findAll() {
        return bills;
    }

    // Additional methods for update, delete, etc.
}
