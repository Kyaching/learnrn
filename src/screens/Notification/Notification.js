import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {messageStore, URL} from '../../store/messageStore';
import {observer} from 'mobx-react-lite';
import BackButton from '../../components/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import MessageButton from '../../components/Button/MessageButton';
import InboxScreen from './InboxScreen';
import ModalItem from '../../components/Modal/ModalItem';
import SentScreen from './SentScreen';
import DraftScreen from './DraftScreen';
import uuid from 'react-native-uuid';

const Notification = observer(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const {navigate} = useNavigation();
  const [inboxMessages, setInboxMessages] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [selectedUser, setSelectedUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const {socket, users, fetchUsers} = messageStore;

  useEffect(() => {
    socket.on('receivedMessage', msg => {
      setInboxMessages(prev => [msg, ...prev]);
    });
    fetchNotificationMessages();
    fetchUsers();
    return () => {
      socket.off('receivedMessage');
    };
  }, [socket, fetchUsers, fetchNotificationMessages]);

  useEffect(() => {
    setReceivers(
      users.map(user => ({
        user_name: user.user_name,
        id: user.user_id,
      })),
    );
  }, [users]);

  const postMessage = async data => {
    try {
      const response = await fetch(`${URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    const id = uuid.v4();
    const message = {
      id: id,
      sender: 'John',
      recivers: selectedUser,
      body,
      subject,
      date: new Date(),
      status: 'Sent',
      parentid: id,
      involvedusers: [...selectedUser, 'John'],
      readers: selectedUser,
      holders: [...selectedUser, 'John'],
      recyclebin: [],
    };
    socket.emit('sendMessage', message);
    postMessage(message);
  };

  const fetchNotificationMessages = useCallback(async () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    try {
      const response = await fetch(`${URL}/messages/received/John/${nextPage}`);
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      setLoading(false);
      setCurrentPage(nextPage);
      setInboxMessages([...inboxMessages, ...data]);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching Data', error);
    }
  }, [currentPage, inboxMessages]);

  const renderScreen = () => {
    switch (selectedTab) {
      case 'inbox':
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={inboxMessages}
            renderItem={({item}) => <InboxScreen item={item} />}
            keyExtractor={item => item.id}
            onEndReached={fetchNotificationMessages}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    width: '90%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {loading && <ActivityIndicator size={'large'} />}
                </View>
              );
            }}
          />
        );
      case 'sent':
        return (
          <FlatList
            data={inboxMessages}
            renderItem={({item}) => <SentScreen item={item} />}
            keyExtractor={item => item.id}
          />
        );
      case 'draft':
        return (
          <FlatList
            data={inboxMessages}
            renderItem={({item}) => <DraftScreen item={item} />}
            keyExtractor={item => item.id}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <ModalItem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        receivers={receivers}
        setSubject={setSubject}
        subject={subject}
        setBody={setBody}
        body={body}
        handleSendMessage={handleSendMessage}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <BackButton onPress={() => navigate('HomeScreen')} />
        <Text style={styles.text}>Notification</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <MessageButton
          title="Inbox"
          value={inboxMessages?.length}
          onPress={() => setSelectedTab('inbox')}
        />
        <MessageButton
          title="Sent"
          value={'3'}
          onPress={() => setSelectedTab('sent')}
        />
        <MessageButton
          title="Draft"
          value="2"
          onPress={() => setSelectedTab('draft')}
        />
      </View>
      <View
        style={{
          marginTop: 20,
        }}>
        <View style={{marginBottom: 40}}>{renderScreen()}</View>
      </View>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={({pressed}) => [
          {opacity: pressed ? 0.5 : 1},
          {
            position: 'absolute',
            bottom: 50,
            right: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2196F3',
            width: 50,
            height: 50,
            borderRadius: 20,
          },
        ]}>
        <Text style={{fontSize: 20, color: '#fff'}}>+</Text>
      </Pressable>
    </View>
  );
});

export default Notification;

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
  inputFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 20, // Optional, adds spacing between elements
  },
  input: {
    borderRadius: 5, // Slightly rounded corners for better aesthetics
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc', // Light gray border
    paddingVertical: 8, // Adds vertical padding for better touch target
    paddingHorizontal: 10, // Adds horizontal padding for text
  },
});
