import {Pressable, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {messageStore} from '../../store/messageStore';
import {observer} from 'mobx-react-lite';

const InboxScreen = observer(({item, selectedItems, setSelectedItems}) => {
  const navigation = useNavigation();
  const {sender, subject, date} = item;

  const handleOnPress = async id => {
    navigation.navigate('details', {
      parentId: item.parentid,
      id: item.id,
    });
    // if (selectedItems.length) {
    //   return handleLongPressedDelete(id);
    // }
    if (item.readers.includes('John')) {
      await messageStore.updateReaders(item.parentid);
      messageStore.socket.emit('read', {id: id, user: 'John'});
      if (messageStore.reader === 'success') {
        navigation.navigate('details', {
          parentId: item.parentid,
          id: item.id,
        });
      }
    } else {
      navigation.navigate('details', {
        parentId: item.parentid,
        id: item.id,
      });
    }
  };

  const handleLongPressedDelete = id => {
    setSelectedItems(prevId =>
      prevId.includes(id) ? prevId.filter(ids => ids !== id) : [id, ...prevId],
    );
  };

  return (
    <Pressable
      onPress={() => handleOnPress(item.parentid)}
      onLongPress={() => handleLongPressedDelete(item.id)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:
          item?.readers?.includes('John') || selectedItems.includes(item.id)
            ? 'gray'
            : 'white',
        opacity:
          item?.readers?.includes('John') || selectedItems.includes(item.id)
            ? 0.5
            : 1,
        marginVertical: 2,
        borderRadius: 4,
        paddingHorizontal: 5,
      }}>
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
    </Pressable>
  );
});

export default InboxScreen;
