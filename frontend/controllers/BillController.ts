import { Bill } from "@/types/Bill";
import { accessAPI } from "@/utils/api";

export class BillController {

    // Create a new bill
    static async createBill(bill: Bill) {
        const response = await accessAPI('/bill_service/create', 'POST', {'bill': bill});
        if (response['status'] !== 'success') {
            throw new Error('Failed to create bill');
        }
        return response;
    }

    // Update an existing bill by ID
    static async updateBill(billID: string, updatedBill: Bill) {
        const response = await accessAPI('/bill_service/updateBill', 'POST', {
            'billID': billID,
            'updatedBill': updatedBill
        });
        if (response['status'] !== 'success') {
            throw new Error('Failed to update bill');
        }
        return response;
    }

    // Delete a bill by ID
    static async deleteBill(billID: string) {
        const response = await accessAPI('/bill_service/deleteBill', 'POST', { 'billID': billID });
        if (response['status'] !== 'success') {
            throw new Error('Failed to delete bill');
        }
        return response;
    }

    // Get all bills
    static async getBills() {
        const response = await accessAPI('/bill_service/findAll', 'GET');
        return response;
    }

    // Schedule a bill reminder
    static async scheduleBillReminder(billID: string, highPriority: boolean) {
        const response = await accessAPI('/bill_service/scheduleBillReminder', 'POST', {
            'billID': billID,
            'highPriority': highPriority
        });
        if (response['status'] !== 'success') {
            throw new Error('Failed to schedule reminder');
        }
        return response;
    }

    // Initiate a payment for a bill
    static async initiatePayment(billID: string) {
        const response = await accessAPI('/bill_service/initiatePayment', 'POST', {
            'billID': billID
        });
        if (response['status'] !== 'success') {
            throw new Error('Failed to initiate payment');
        }
        return response;
    }

    static async findAll() {
        const response = await accessAPI('/bill_service/findAll', 'GET');
        return response;
    }

    // Agregar un evento al calendario
    static async addEventToCalendar(reminder: any) {
        const response = await accessAPI('/calendar_service/addEvent', 'POST', { reminder });
        if (response['status'] !== 'success') {
            throw new Error('Failed to add event to calendar');
        }
        return response;
    }

    // Iniciar un pago
    static async initiateSecurePayment(payment_info: string) {
        const response = await accessAPI('/payment_service/initiateSecurePayment', 'POST', { payment_info });
        if (response['status'] !== 'success') {
            throw new Error('Failed to initiate payment');
        }
        return response;
    }

    // Enviar una notificación
    static async sendNotification(notification: any) {
        const response = await accessAPI('/notification_service/send', 'POST', { notification });
        if (response['status'] !== 'success') {
            throw new Error('Failed to send notification');
        }
        return response;
    }

    // Programar un recordatorio
    static async scheduleReminder(reminder: any) {
        const response = await accessAPI('/reminder_service/schedule', 'POST', { reminder });
        if (response['status'] !== 'success') {
            throw new Error('Failed to schedule reminder');
        }
        return response;
    }
}
