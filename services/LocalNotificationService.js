import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'

class LocalNotificationService {

    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function(token) {
                console.log('Local notification service - onregister', token)
            },
            onNotification: function(notification) {
                //console.log('Local notification service - on notification', notification)
                if(!notification?.data){
                    return
                }
                notification.userInteraction = true
                var msgAndroid = { title: notification.title, body: notification.message }

                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : msgAndroid)

                if(Platform.OS === 'ios'){
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            },

            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            senderID: '554164322879',

            popInitialNotification: true,
            requestPermissions: true
        })
    }

    unRegister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            ...this.buildAndroidNotification(id, title, message, data, options),
            ...this.buildIOSNotification(id, title, message, data, options),
            title: title || '',
            message: message || '',
            playSound: options.playSound || false,
            soundName: soundName || 'default',
            userInteraction: false
        })
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || 'ic_laucher',
            smallIcon: options.smallIcon || 'ic_notification',
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || '',
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if(Platform.OS === 'ios'){
            PushNotificationIOS.removeAllDeliveredNotifications()
        }else{
            PushNotification.cancelAllLocalNotifications()
        }
    }

    removeAllDeliveredNotifications = (notificationId) => {
        console.log('local notification service', notificationId)
        PushNotification.cancelLocalNotifications({id: `${notificationId}`})
    }
}

export const localNotificationService = new LocalNotificationService()