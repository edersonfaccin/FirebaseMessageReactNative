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
        /*PushNotificationIOS.localNotification({
            vibrate: true, 
            vibration: 800,
            subText: message.body, 
            priority: "high",
            title: message.title, 
            message: message
        })*/
    }else{
        PushNotification.localNotification({
            vibrate: true, 
            vibration: 800,
            //bigText: message,
            subText: message.body, 
            priority: "high",
            title: message.title, 
            message: message
        })
    }
}

export { PushMessage }