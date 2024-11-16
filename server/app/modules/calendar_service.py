from datetime import datetime

class CalendarService:
    def __init__(self):
        self.events = []

    def addEvent(self, reminder):
        # Logic to add an event to the user's calendar
        event = {
            'bill_id': reminder.bill_id,
            'due_date': reminder.due_date,
            'user_id': reminder.user_id,
            'created_at': datetime.now()
        }
        self.events.append(event)
        print(f"Event added to calendar for bill {reminder.bill_id} due on {reminder.due_date}")

    def getEvents(self, user_id):
        # Retrieve events for a specific user
        user_events = [event for event in self.events if event['user_id'] == user_id]
        return user_events

    def removeEvent(self, bill_id):
        # Logic to remove an event from the calendar
        self.events = [event for event in self.events if event['bill_id'] != bill_id]
        print(f"Event for bill {bill_id} removed from calendar.")
