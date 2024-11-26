```mermaid 
sequenceDiagram
    participant G as George (User)
    participant WB as WebView
    participant SC as SubscriptionController
    participant SS as SubscriptionService
    participant RS as ReminderService
    participant CS as CalendarService
    participant DBH as DatabaseHandler
    participant DB as Database

    Note over G, DB: Subscription Categorization & Tracking 
    G->>WB: Access subscription overview
    WB->>DB: Retrieve User's Subscriptions 
    DB-->>WB: George's subscriptions
    WB->>SC: categorizeSubscription()
    SC-->>WB: update subscriptions view

    Note over G, DB: Update Process
    G->>WB: Select subscription and update it 
    WB->>SC: updateSubscription()
    SC->>SS: updateSubscription()
    SS->>DBH: update()
    DBH->>DB: SQL Command
    DB-->>SC: succesful update (subscription)

    Note over WB, DB: Setting Up Subscription Reminders
    G->>WB: Set Renewal Reminder (switch)
    WB->>SC: setRenewalReminder()
    SC->>SS: scheduleSubscriptionReminder(subscriptionID)
    SS->>RS: scheduleReminder()
    RS->>DBH: create()
    DBH->>DB: SQL Command

    Note over WB, DB: View Gets Updated Based on Changes to the Database
    DB-->>WB: update view
    DB-->>RS: success reminder creation
    RS-->>CS: sync reminder with calendar
    RS-->>SC: reminder success

```