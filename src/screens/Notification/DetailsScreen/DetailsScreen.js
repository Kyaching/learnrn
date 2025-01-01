import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackButton from '../../../components/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import {ACCESS_TOKEN, messageStore, URL} from '../../../store/messageStore';
import {observer} from 'mobx-react-lite';
import Button from '../../../components/Button/Button';
import ReplyModal from '../../../components/Modal/ReplyModel';
import uuid from 'react-native-uuid';

const DetailsScreen = observer(({route}) => {
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const {parentId, id, from} = route.params;
  const navigation = useNavigation();
  const {socket} = messageStore;

  useEffect(() => {
    socket.on('sentMessage', msg => {
      messageStore.appendMessage('reply', msg);
    });

    return () => {
      socket.off('sentMessage');
    };
  }, [socket]);

  useEffect(() => {
    messageStore.fetchUniqueMessage(id);
  }, [id]);

  useEffect(() => {
    messageStore.fetchReplyMessages(parentId);
  }, [parentId]);

  const postMessage = async data => {
    try {
      const response = await fetch(`${URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('Error fetching Data', error);
    }
  };

  const handleSendMessage = () => {
    const receivers = messageStore.uniqueMessage.involvedusers.filter(
      usr => usr !== 'John',
    );

    const message = {
      id: uuid.v4(),
      sender: 'John',
      recivers: [...receivers],
      subject: replySubject,
      body: replyBody,
      date: new Date(),
      status: 'Sent',
      parentid: parentId,
      involvedusers: [...receivers, 'John'],
      readers: [...receivers],
      holders: [...receivers, 'John'],
      recyclebin: [],
    };
    socket.emit('sendMessage', message);
    postMessage(message);
  };

  const handleOpenModal = modal => {
    if (modal === 'draft') {
      messageStore.setModalVisible(true, modal);
    } else {
      setReplyModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ReplyModal
        modalVisible={replyModalVisible}
        setModalVisible={setReplyModalVisible}
        replySubject={replySubject}
        setReplySubject={setReplySubject}
        replyBody={replyBody}
        setReplyBody={setReplyBody}
        handleSendMessage={handleSendMessage}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.text}>Notification</Text>
      </View>
      <ScrollView>
        {messageStore?.replyMessages?.map(item => (
          <View key={item.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
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
                    {item.sender?.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.text}> {item.sender}</Text>
              </View>
              <Button
                label={from === 'draft' ? 'edit' : 'reply'}
                onPress={() => handleOpenModal(from)}
                style={{width: 70, backgroundColor: 'gray', marginTop: -20}}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>From:{item.sender}</Text>
              <Text>To:{item.recivers.join(', ')}</Text>
            </View>
            <View style={{marginTop: 20}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={[
                    styles.text,
                    {alignSelf: 'flex-start', marginBottom: 20},
                  ]}>
                  {item.subject}
                </Text>
                <Text style={{marginTop: -10}}>
                  {new Date(item.date).toLocaleString()}
                </Text>
              </View>

              <Text>{item.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
