from datetime import datetime, timedelta

class Notification:
    def __init__(self, message, user_id, scheduled_time=None):
        self.message = message
        self.user_id = user_id
        self.scheduled_time = scheduled_time or datetime.now()

class NotificationService:
    def __init__(self):
        self.notifications = []

    def sendNotification(self, notification: Notification):
        # Logic to send notification to the user
        print(f"Notification sent to {notification.user_id}: {notification.message}")
        return notification.message

    def scheduleNotification(self, due_date):
        # Logic to schedule a notification
        notification = Notification(message="Bill due soon!", user_id="user_id_placeholder", scheduled_time=due_date)
        self.notifications.append(notification)
        print(f"Notification scheduled for {due_date}")

    def cancelNotification(self, notification_id: str):
        # Logic to cancel a scheduled notification
        self.notifications = [n for n in self.notifications if n.message != notification_id]
        print(f"Notification {notification_id} canceled.")

    def checkScheduledNotifications(self):
        # Check for notifications that need to be sent
        now = datetime.now()
        for notification in self.notifications:
            if notification.scheduled_time <= now:
                self.sendNotification(notification)
                self.notifications.remove(notification)
