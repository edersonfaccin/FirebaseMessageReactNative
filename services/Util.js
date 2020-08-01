import PushNotificationIOS from "@react-native-community/push-notification-ios"
import PushNotification from 'react-native-push-notification'
import { Platform } from 'react-native'

function PushMessage(message){

    if(Platform.OS === 'ios'){
        PushNotificationIOS.localNotification({
            vibrate: true, 
            vibration: 800,
            subText: "Bloqueio perto de você", 
            priority: "high",
            title: "NoBlitz", 
            message: message
        })
    }else{
        PushNotification.localNotification({
            vibrate: true, 
            vibration: 800,
            //bigText: message,
            subText: "Bloqueio perto de você", 
            priority: "high",
            title: "NoBlitz", 
            message: message
        })
    }
}

export { PushMessage }