// import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
// import {Alert} from 'react-native';
// import {AppState} from 'react-native';

// function FCMHandler() {
//   const navigation = useNavigation();
//   const [backgroundMessage, setBackgroundMessage] = useState(null);

//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     //  여기에 로직을 작성한다.
//     console.log('Message handled in the background!', remoteMessage);
//     //  remoteMessage.data로 메세지에 접근가능
//     //  remoteMessage.from 으로 topic name 또는 message identifier
//     //  remoteMessage.messageId 는 메시지 고유값 id
//     //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
//     //  remoteMessage.sentTime 보낸시간
//     setBackgroundMessage(remoteMessage);
//   });

//   useEffect(() => {
//     const appStateListener = AppState.addEventListener(
//       'change',
//       nextAppState => {
//         if (nextAppState === 'active' && backgroundMessage) {
//           // 포그라운드로 돌아왔을 때 백그라운드 메시지 처리
//           Alert.alert(
//             'A new FCM message arrived!',
//             JSON.stringify(backgroundMessage),
//           );
//           navigation.navigate('AlarmPage', {
//             alarmId: backgroundMessage.data.alarmId,
//             time: backgroundMessage.data.alarmTime,
//             alarmName: backgroundMessage.notification.title,
//           });
//           setBackgroundMessage(null); // 처리 후 상태 초기화
//         }
//       },
//     );

//     return () => {
//       appStateListener.remove();
//     };
//   }, [backgroundMessage, navigation]);

//   return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
// }

// export default FCMHandler;

import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

function FCMHandler() {
  const navigation = useNavigation();
  const [message, setMessage] = useState(null);

  const handleForegroundMessage = remoteMessage => {
    console.log('Message handled in the foreground!', remoteMessage);
    // 포그라운드 메시지 처리 로직
    setMessage(remoteMessage);
    // 필요한 경우 알림 표시
    Alert.alert('New FCM Message!', JSON.stringify(remoteMessage));
    // 추가로 필요한 내비게이션 또는 상태 업데이트
  };

  useEffect(() => {
    // 포그라운드 메시지 리스너 등록
    const unsubscribe = messaging().onMessage(handleForegroundMessage);

    // 백그라운드에서 메시지 처리 리스너
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      setMessage(remoteMessage);
    });

    return unsubscribe; // 컴포넌트 언마운트 시 리스너 제거
  }, []);

  useEffect(() => {
    if (message) {
      // 메시지가 있을 경우 로직 처리
      navigation.navigate('AlarmPage', {
        alarmId: message.data.alarmId,
        time: message.data.alarmTime,
        alarmName: message.notification.title,
      });
      setMessage(null); // 처리 후 상태 초기화
    }
  }, [message, navigation]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}

export default FCMHandler;
