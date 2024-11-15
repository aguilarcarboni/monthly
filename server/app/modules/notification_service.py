from app.helpers.logger import logger
from datetime import datetime, timedelta
import threading

class NotificationService:
    def init(self):
        self.notifications = {}  # Store scheduled notifications

    def sendNotification(self, notification):
        # Logic to send notification to the user
        logger.info(f"Sending notification: {notification}")
        # For example: email_service.send(notification)

    def scheduleNotification(self, notification, dateTime):
        # Schedule a notification to be sent at a specific time
        if dateTime < datetime.now():
            return "Cannot schedule a notification in the past."

        delay = (dateTime - datetime.now()).total_seconds()
        timer = threading.Timer(delay, self.sendNotification, args=[notification])
        timer.start()
        notification_id = id(timer)  # Unique ID for the scheduled notification
        self.notifications[notification_id] = timer
        logger.info(f"Scheduled notification: {notification} at {dateTime}")
        return notification_id

    def cancelNotification(self, notificationId):
        # Cancel a scheduled notification
        timer = self.notifications.pop(notificationId, None)
        if timer:
            timer.cancel()
            logger.info(f"Cancelled notification with ID: {notificationId}")
            return "Notification cancelled."
        else:
            return "Notification ID not found."