export interface Bill {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    paid: boolean;
    category: string;
    renewal: string;
    status: string;
}
