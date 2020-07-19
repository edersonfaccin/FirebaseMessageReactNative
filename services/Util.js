import PushNotificationIOS from "@react-native-community/push-notification-ios"
import PushNotification from 'react-native-push-notification'
import { Platform } from 'react-native'

function PushMessage(message){

    if(Platform.OS === 'ios'){
        //TODO
    }else{
        PushNotification.localNotification({
            vibrate: true, 
            vibration: 1000,
            //bigText: message,
            subText: "Bloqueio perto de você", 
            priority: "high",
            title: "NoBlitz", 
            message: message
        })
    }
}

export { PushMessage }