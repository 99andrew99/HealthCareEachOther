import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {AppState} from 'react-native';

function FCMHandler() {
  const navigation = useNavigation();
  const [backgroundMessage, setBackgroundMessage] = useState(null);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    //  여기에 로직을 작성한다.
    console.log('Message handled in the background!', remoteMessage);
    //  remoteMessage.data로 메세지에 접근가능
    //  remoteMessage.from 으로 topic name 또는 message identifier
    //  remoteMessage.messageId 는 메시지 고유값 id
    //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
    //  remoteMessage.sentTime 보낸시간
    setBackgroundMessage(remoteMessage);
  });

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active' && backgroundMessage) {
          // 포그라운드로 돌아왔을 때 백그라운드 메시지 처리
          Alert.alert(
            'A new FCM message arrived!',
            JSON.stringify(backgroundMessage),
          );
          navigation.navigate('AlarmPage', {
            alarmId: backgroundMessage.data.alarmId,
            time: backgroundMessage.data.time,
            alarmName: backgroundMessage.data.alarmName,
          });
          setBackgroundMessage(null); // 처리 후 상태 초기화
        }
      },
    );

    return () => {
      appStateListener.remove();
    };
  }, [backgroundMessage, navigation]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}

export default FCMHandler;
