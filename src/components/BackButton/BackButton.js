import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../Button/Button';
import ArrowLeft from '../../assets/img/arrow.png';

const BackButton = ({onPress}) => {
  return (
    <Button
      onPress={onPress}
      style={{backgroundColor: 'transparent', width: 32, height: 32}}>
      <Image style={{width: 28, height: 28}} source={ArrowLeft} />
    </Button>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
