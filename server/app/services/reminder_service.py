class Reminder:
    def __init__(self, bill_id, due_date, user_id):
        self.bill_id = bill_id
        self.due_date = due_date
        self.user_id = user_id
        self.status = 'pending'

class ReminderService:
    def __init__(self, notification_service, calendar_service):
        self.reminders = []
        self.notification_service = notification_service
        self.calendar_service = calendar_service

    def scheduleReminder(self, reminder: Reminder):
        self.reminders.append(reminder)
        self.notification_service.scheduleNotification(reminder.due_date)
        if reminder.user_id:  # Assuming user_id indicates syncing preference
            self.calendar_service.addEvent(reminder)

    def findDueReminders(self):
        from datetime import datetime
        return [reminder for reminder in self.reminders if reminder.due_date <= datetime.now() and reminder.status == 'pending']

    def updateReminderStatus(self, reminder: Reminder, status: str):
        reminder.status = status
