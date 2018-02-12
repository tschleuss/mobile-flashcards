import { AsyncStorage, Alert } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setupLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            scheduleLocalNotification()
                        } else {
                            infoUserNotificationDisabled()
                        }
                    })
            }
        })
}

export function createNotification() {
    return {
        title: 'It\'s time to study!',
        body: 'Don\'t forget to do your daily quiz!',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

function scheduleLocalNotification() {
    Notifications.cancelAllScheduledNotificationsAsync()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(8)
    tomorrow.setMinutes(0)
    Notifications.scheduleLocalNotificationAsync(
        createNotification(), { time: tomorrow, repeat: 'day' }
    )
    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
}

function infoUserNotificationDisabled() {
    const msg = 'Seems that you don\'t granted permission to display notifications. To this app fully work, please, turn on notifications on your device settings.'
    const btns = [{ text: 'OK' }]
    Alert.alert('Notifications disabled', msg, btns)
}
