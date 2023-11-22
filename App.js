/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import StartPage from './component/loginComponent/startPage';
import RegisterPage from './component/loginComponent/registerPage';
import Main from './component/main/main';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './component/loginComponent/loginPage';
import messaging from '@react-native-firebase/messaging';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Profile from './component/main/profile';
import ConstructGroup from './component/constructGroup/constructGroup';
import ConnectScreen from './component/constructGroup/connectScreen';
import ManageGroup from './component/manageGroup/manageGroup';
import CreateAlarmScreen from './component/createAlarm/createAlarmScreen';
import AlarmEdit from './component/alramEdit/alarmEdit';
import AlarmPage from './component/createAlarm/alarmPage';
import DownArrow from './assets/images/back.png';
import FCMHandler from './component/fcm/fcmHandler';

const Stack = createNativeStackNavigator();

function App() {
  const [fcmMessage, setFcmMessage] = useState({});
  // Background, Quit 상태일 경우
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    //  여기에 로직을 작성한다.
    console.log('Message handled in the background!', remoteMessage);
    //  remoteMessage.data로 메세지에 접근가능
    //  remoteMessage.from 으로 topic name 또는 message identifier
    //  remoteMessage.messageId 는 메시지 고유값 id
    //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
    //  remoteMessage.sentTime 보낸시간
  });

  // // Foreground 상태인 경우
  // React.useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     setFcmMessage(JSON.stringify(remoteMessage));
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     console.log('분석용', JSON.stringify(remoteMessage));
  //   });
  //   console.log('로그로그', fcmMessage);

  //   // AlarmPage로 이동하며 필요한 데이터 전달
  //   navigation.navigate('AlarmPage', {
  //     alarmId: remoteMessage.data.alarmId,
  //     time: remoteMessage.data.time,
  //     alarmtitle: remoteMessage.data.alarmtitle,
  //   });

  //   checkToken();
  //   return unsubscribe;
  // }, [navigation]);

  // const checkToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   if (fcmToken) {
  //     console.log(fcmToken);
  //   }
  // };

  // React.useEffect(() => {
  //   checkToken();
  // });

  return (
    <NavigationContainer>
      <FCMHandler />
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={({navigation}) => ({
            header: () => (
              <View>
                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={DownArrow}
                    style={{
                      position: 'absolute',
                      left: 30,
                      top: 15,
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={({navigation}) => ({
            header: () => (
              <View>
                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={DownArrow}
                    style={{
                      position: 'absolute',
                      left: 30,
                      top: 15,
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConnectScreen"
          component={ConnectScreen}
          options={({navigation}) => ({
            header: () => (
              <View>
                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={DownArrow}
                    style={{
                      position: 'absolute',
                      left: 30,
                      top: 15,
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ManageGroup"
          component={ManageGroup}
          options={({navigation}) => ({
            header: () => (
              <View>
                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={DownArrow}
                    style={{
                      position: 'absolute',
                      left: 30,
                      top: 15,
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
          initialParams={null}
        />
        <Stack.Screen
          name="CreateAlarm"
          component={CreateAlarmScreen}
          options={({navigation}) => ({
            header: () => (
              <View>
                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={DownArrow}
                    style={{
                      position: 'absolute',
                      left: 30,
                      top: 35,
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AlarmEdit"
          component={AlarmEdit}
          options={({navigation}) => ({
            header: () => (
              <View>
                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={DownArrow}
                    style={{
                      position: 'absolute',
                      left: 30,
                      top: 35,
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AlarmPage"
          component={AlarmPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
