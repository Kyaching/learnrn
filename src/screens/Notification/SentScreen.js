import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SentScreen = ({item}) => {
  const navigation = useNavigation();
  const {subject, date, recivers} = item;
  const usernames = recivers.map(name => name.split('@')[0]);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('details', {
          parentId: item.parentid,
          id: item.id,
        })
      }
      style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 16,
        }}>
        {recivers.map((usr, index) => (
          <View
            key={index}
            style={{
              height: 40,
              width: 40,
              backgroundColor: 'gray',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 3,
            }}>
            <Text style={{textAlign: 'center', color: '#fff'}}>
              {usr.charAt(0)}
            </Text>
          </View>
        ))}

        <View style={{}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'semibold',
              paddingLeft: 10,
              flexDirection: 'row',
            }}>
            {usernames.join(', ')}
          </Text>
          <Text style={{paddingLeft: 10}}>{subject?.slice(0, 24)}</Text>
        </View>
      </View>

      <Text style={{alignItems: 'flex-end'}}>
        {new Date(date).toLocaleString()}
      </Text>
    </Pressable>
  );
};

export default SentScreen;
