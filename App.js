import { StatusBar } from 'expo-status-bar';
import React ,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
  shouldShowAlert: true,
  shouldPlaySound: false,
  shouldSetBadge: false,
  }),
 })
 
export default function App() {
const once= "";
  useEffect(() => {
    registerForPushNotification().then(token=>register(token)).catch(err=>console.log(Err))
    
  }, [once])
  async function register(token)
  {
    console.log(token);
    if(token!==null)
    {
      try{
        const res= await fetch('http://fawrytest1-001-site1.htempurl.com/api/Notifications/InsertRegisterationToken?Token='+token,{
          method:'post',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
         
      });
      if(res.ok())
      {
        console.log('api posted successfully');
      }
      }catch(e){
  console.log(e);
      }
    }

  }
  async function registerForPushNotification(){
    const {status}=await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if(status!='granted')
    {
      const {status}=await Permissions.askAsync(Permissions.NOTIFICATIONS);
    } 
    
    if(status!='granted')
    {
     alert('fail to get push token')
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
 
  
    return token;
  }
  return (
    <View style={styles.container}>
      <Text>hi</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});