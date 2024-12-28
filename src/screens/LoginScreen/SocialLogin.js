import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../../components/Button/Button';
import GoogleImg from '../../assets/img/google.png';
import FbImg from '../../assets/img/facebook.png';
import AppleImg from '../../assets/img/apple.png';
const SocialLogin = () => {
  return (
    <View style={{marginTop: 40}}>
      <Text style={{alignSelf: 'center'}}>Or Continue with</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}>
        <Button style={{width: 60, backgroundColor: '#ECECEC'}}>
          <Image source={GoogleImg} />
        </Button>
        <Button style={{width: 60, backgroundColor: '#ECECEC'}}>
          <Image source={FbImg} />
        </Button>
        <Button style={{width: 60, backgroundColor: '#ECECEC'}}>
          <Image source={AppleImg} />
        </Button>
      </View>
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({});
