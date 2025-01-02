import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MessageButton = ({title, value, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '25%',
          borderRadius: 50,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderColor: 'gray',
        },
        pressed
          ? {backgroundColor: 'gray', opacity: 0.3}
          : {backgroundColor: 'transparent'},
      ]}>
      <Text style={styles.text}>{title}</Text>
      <Text style={{fontSize: 18, fontWeight: '400'}}>{value}</Text>
    </Pressable>
  );
};

export default MessageButton;

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
