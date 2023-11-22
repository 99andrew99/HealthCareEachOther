/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Config from 'react-native-config';
import messaging from '@react-native-firebase/messaging';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterPage({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [deviceKey, setDeviceKey] = useState('');

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      setDeviceKey(fcmToken);
    }
  };

  checkToken();

  const signUpAuth = () => {
    if (email === '' || password === '' || nickname === '') {
      setIsEmpty(true);
      return;
    }

    fetch(`${Config.REACT_APP_IP_ADDRESS}:8080/api/mvp/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceKey: deviceKey,
        memberId: email,
        memberName: nickname,
        password: password,
      }),
    })
      .then(data => {
        if (data.status === 201) {
          // 회원가입 성공
          alert('회원가입에 성공했습니다.');
          navigation.goBack();
        } else {
          // 회원가입 실패
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        console.log(error);
        console.error('회원가입 요청 중 오류 발생:', error);
      });
  };

  return (
    <View style={styles.TopContainer}>
      <View style={styles.LoginPwContainer}>
        <Text style={styles.LoginText}>이메일</Text>
        <TextInput
          style={styles.LoginInput}
          placeholder="이메일 입력"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.PwText}>비밀번호</Text>
        <TextInput
          style={styles.PwInput}
          placeholder="비밀번호 입력"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.PwText}>닉네임</Text>
        <TextInput
          style={styles.PwInput}
          placeholder="닉네임 입력"
          placeholderTextColor="gray"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>
      <View>
        {isEmpty ? (
          <Text style={styles.errorText}>
            이메일, 비밀번호, 닉네임을 모두 입력해주세요.
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.SignInBtn}>
        <TouchableOpacity onPress={signUpAuth}>
          <Text style={styles.SignInBtnText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  LoginPwContainer: {
    marginTop: '10%',
    width: '85%', // 일단 % 단위로 스타일링 했음. 나중에 flex 단위가 필요하면 바꿀게
    height: '40%',
    // borderWidth: 2,
    // borderColor: 'black',
    flexDirection: 'column',
  },
  SignInBtn: {
    marginTop: '80%',
    width: '85%',
    height: '7%',
    borderRadius: 15,
    backgroundColor: '#3AD277',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInBtnText: {
    color: 'white',
    fontWeight: '600',
  },
  LoginText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    letterSpacing: -1,
  },
  LoginInput: {
    width: '100%',
    height: '18%',
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  PwText: {
    marginTop: '10%',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    letterSpacing: -1,
  },
  PwInput: {
    width: '100%',
    height: '18%',
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    fontWeight: '600',
  },
});
