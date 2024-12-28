import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const InboxScreen = ({item}) => {
  const {sender, subject, date} = item;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 16,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: 'gray',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center', color: '#fff'}}>
            {sender?.charAt(0)}
          </Text>
        </View>
        <View style={{paddingLeft: 10}}>
          <Text style={{fontSize: 17, fontWeight: 'semibold'}}>{sender}</Text>
          <Text>{subject?.slice(0, 24)}</Text>
        </View>
      </View>
      <Text style={{alignItems: 'flex-end'}}>
        {new Date(date).toLocaleString()}
      </Text>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({});
