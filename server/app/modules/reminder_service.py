from app.helpers.logger import logger
from app.modules.notification_service import NotificationService
from datetime import datetime
import threading

class Reminder:
    def __init__(self, bill_id, due_date, message):
        self.bill_id = bill_id
        self.due_date = due_date
        self.message = message
        self.status = 'pending'  # Status can be 'pending', 'sent', or 'cancelled'

class ReminderService:
    def __init__(self):
        self.reminders = []  # List to store reminders
        self.notification_service = NotificationService()  # Instance of NotificationService

    def scheduleReminder(self, reminder: Reminder):
        # Schedule a reminder notification
        if reminder.due_date < datetime.now():
            logger.warning("Cannot schedule a reminder in the past.")
            return "Cannot schedule a reminder in the past."

        reminder_id = id(reminder)  # Unique ID for the reminder
        delay = (reminder.due_date - datetime.now()).total_seconds()
        timer = threading.Timer(delay, self.sendReminder, args=[reminder])
        timer.start()
        self.reminders.append(reminder)
        logger.info(f"Scheduled reminder for bill ID: {reminder.bill_id} at {reminder.due_date}")
        return reminder_id

    def sendReminder(self, reminder: Reminder):
        # Send the reminder notification
        self.notification_service.sendNotification(reminder.message)
        reminder.status = 'sent'
        logger.info(f"Reminder sent for bill ID: {reminder.bill_id}")

    def findDueReminders(self):
        # Find all reminders that are due
        due_reminders = [reminder for reminder in self.reminders if reminder.due_date <= datetime.now() and reminder.status == 'pending']
        logger.info(f"Found {len(due_reminders)} due reminders.")
        return due_reminders

    def updateReminderStatus(self, reminder_id, new_status):
        # Update the status of a reminder
        for reminder in self.reminders:
            if id(reminder) == reminder_id:
                reminder.status = new_status
                logger.info(f"Updated reminder status for bill ID: {reminder.bill_id} to {new_status}")
                return f"Reminder status updated to {new_status}."
        return "Reminder ID not found."