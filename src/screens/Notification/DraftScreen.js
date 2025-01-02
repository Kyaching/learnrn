import {Pressable, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const DraftScreen = ({
  item,
  setDraftMessage,
  setSubject,
  setBody,
  setSelectedUser,
}) => {
  const navigation = useNavigation();
  const {subject, date, recivers, id, body, parentid, sender} = item;
  const usernames = recivers.map(name => name.split('@')[0]);

  useEffect(() => {
    return () => {
      setSubject('');
      setBody('');
      setSelectedUser([]);
    };
  }, [setBody, setSubject, setSelectedUser]);

  useEffect(() => {
    setDraftMessage(item);
  }, [item, setDraftMessage]);

  const handleToDetails = () => {
    navigation.navigate('details', {
      parentId: item.parentid,
      id: item.id,
      from: 'draft',
    });
    const message = {
      id,
      sender,
      parentid,
      subject,
      body,
      recivers,
    };
    setDraftMessage(message);

    setSubject(subject);
    setBody(body);
    setSelectedUser(recivers);
  };

  return (
    <Pressable
      onPress={() => handleToDetails()}
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

export default DraftScreen;
