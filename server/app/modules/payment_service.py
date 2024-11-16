import random
import string

class PaymentService:
    def initiateSecurePayment(self, payment_info: str):
        # Logic to initiate a secure payment
        transaction_id = self.generateTransactionId()
        print(f"Payment initiated with info: {payment_info}. Transaction ID: {transaction_id}")
        return transaction_id

    def verifyPaymentDetails(self, payment_info: str):
        # Logic to verify payment details (mock verification)
        if payment_info and isinstance(payment_info, str):
            print(f"Payment details verified for: {payment_info}")
            return True
        print("Payment details verification failed.")
        return False

    def processPayment(self, payment_info: str):
        if self.verifyPaymentDetails(payment_info):
            transaction_id = self.initiateSecurePayment(payment_info)
            # Logic to process the payment (mock processing)
            print(f"Payment processed successfully. Transaction ID: {transaction_id}")
            return transaction_id
        else:
            print("Payment processing failed due to invalid details.")
            return None

    def generateTransactionId(self):
        # Generate a unique transaction ID
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
