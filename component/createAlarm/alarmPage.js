/* eslint-disable prettier/prettier */
import {React, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Config from 'react-native-config';

import alarmDefaultImg from '../../assets/images/alarmDefaultImg.jpg';
import alarmPlay from '../../assets/images/alarmPlay.png';

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
  ImageBackground,
  Image,
} from 'react-native';

export default function AlarmPage({navigation, route}) {
  const {alarmId, time, alarmName} = route.params;

  return (
    <View style={styles.TopContainer}>
      <ImageBackground source={alarmDefaultImg} style={styles.TopBg} />
      <View style={styles.overlay} />

      <View style={styles.currentTimeContainer}>
        <Text style={styles.ampm}>AM</Text>
        <Text style={styles.currentTime}>{time}</Text>
      </View>

      <Text style={styles.alarmTitle}>{alarmName}</Text>

      <Text style={styles.audioInfo}>녹음된 소리 재생</Text>

      <TouchableOpacity style={styles.playBtnContainer}>
        <Image source={alarmPlay} style={styles.playBtn} />
      </TouchableOpacity>

      <View style={styles.acceptBtnContainer}>
        <TouchableOpacity
          style={styles.acceptBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.acceptBtnText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    flex: 1,
  },
  TopBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 오버레이를 부모 요소와 동일한 크기로 만듭니다.
    backgroundColor: '#000', // 검정색
    position: 'absolute',
    opacity: 0.7, // 반투명도 조정 (0에서 1 사이의 값)
  },
  currentTimeContainer: {
    width: '100%',
    height: '7.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  ampm: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
    marginTop: 'auto',
  },
  currentTime: {
    color: 'white',
    fontSize: 50,
    marginLeft: '2%',
    fontWeight: '400',
  },

  alarmTitle: {
    color: 'white',
    fontSize: 50,
    marginTop: '20%',
    textAlign: 'center',
    fontWeight: '400',
  },
  audioInfo: {
    color: 'white',
    fontSize: 30,
    marginTop: '20%',
    textAlign: 'center',
    fontWeight: '300',
  },

  playBtnContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playBtn: {
    width: 100,
    height: 100,
  },

  acceptBtnContainer: {
    marginTop: '20%',
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtn: {
    width: '50%',
    height: '80%',
    borderRadius: 50,
    backgroundColor: '#3AD277',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
  },
});
