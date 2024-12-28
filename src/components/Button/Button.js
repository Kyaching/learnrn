import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

const Button = ({label, style, onPress, variant = 'primary', children}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        style,
        pressed ? {opacity: 0.5} : {},
      ]}>
      {!children && (
        <Text
          style={[styles.text, variant !== 'primary' ? {color: 'black'} : {}]}>
          {label}
        </Text>
      )}
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#176FF2',
    width: '90%',
    alignItems: 'center',
    height: 42,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: 'white',
  },
});
