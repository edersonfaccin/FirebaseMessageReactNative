import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { fcmService } from './services/FCMService'
import { localNotificationService } from './services/LocalNotificationService'

const App = () => {

  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token){
      console.log("[APP] on register", token)
    }

    function onNotification(notify){
      console.log("[APP] on notify", notify)
      
      const options = {
        soundName: 'default',
        playSound: true
      }

      localNotificationService.showNotification(0, notify.title, notify.body, notify, options)
    }

    function onOpenNotification(notify){
      console.log("[App] onOpenNotification: ", notify)

      
    }

    return () => {
      console.log("[App] unregister")
      fcmService.unRegister()
      localNotificationService.unRegister()
    }
  }, [])

  return (
    <View style={styles.container}>      
      <Text>Sample React Native Firebase</Text>
      <Text>Push Notification</Text>
      <Text>https://console.firebase.google.com</Text>
      <Text>Send Remote Messages</Text>
       <Button title="Press me" 
        onPress={() => localNotificationService.cancelAllLocalNotifications()}/>
      <Text>Author: Ederson Faccin Frasson</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App