import PushNotificationIOS from "@react-native-community/push-notification-ios"
import PushNotification from 'react-native-push-notification'
import { Platform } from 'react-native'

function PushMessage(message){
    if(Platform.OS === 'ios'){
        PushNotificationIOS.requestPermissions()

        PushNotificationIOS.presentLocalNotification({
            alertBody: message.body,
            alertTitle: message.title
        })
    }else{
        PushNotification.localNotification({
            vibrate: true, 
            vibration: 1000,
            bigText: message.body,
            subText: message.body, 
            priority: "high",
            title: message.title, 
            message: message.body
        })
    }
}

export { PushMessage }