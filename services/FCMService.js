import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import { PushMessage } from './Util'

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async() => {
        if(Platform.OS === 'ios'){
            await messaging().registerDeviceForRemoteMessages()
            await messaging().setAutoInitEnabled(true)
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission().then(enabled => {
            if(enabled) {
                this.getToken(onRegister)
            }else{
                this.requestPermission(onRegister)
            }
        }).catch(error => {
            console.log('Permission rejected', error)
        })
    }

    getToken = (onRegister) => {
        messaging().getToken().then(fcmToken => {
            if(fcmToken) {
                onRegister(fcmToken)
            }else{
                console.log('User does not have a device token')
            }
        }).catch(error => {
            console.log('get token rejected', error)
        })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission().then(() => {
            this.getToken(onRegister)
        }).catch(error => {
            console.log('Request permission rejected', error)
        })
    }

    deleteToken = () => {
        console.log('fcmService', 'delete token')

        messaging().deleteToken().catch(error => {
            console.log('delete token error', error)
        })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('onNotification caused app to open')

            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        })

        messaging().getInitialNotification().then(remoteMessage => {
            console.log('get initial notification caused app to open')

            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        })

        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log('a new fcm message arrived', remoteMessage)
            
            if(remoteMessage){
                let notification = null

                if(Platform.OS === 'ios'){
                    notification = remoteMessage.data.notification            
                }else{
                    notification = remoteMessage.notification
                }

                if(!!notification.body) PushMessage(notification) 
            }
        })

        messaging().onTokenRefresh(fcmToken => {
            console.log('new token refresh', fcmToken)
            onRegister(fcmToken)
        })
    }

    unRegister = () => {
        this.messageListener()
    }
}

export const fcmService = new FCMService()