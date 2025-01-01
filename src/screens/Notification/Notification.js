import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ACCESS_TOKEN, messageStore, URL} from '../../store/messageStore';
import {observer} from 'mobx-react-lite';
import BackButton from '../../components/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import MessageButton from '../../components/Button/MessageButton';
import InboxScreen from './InboxScreen';
import ModalItem from '../../components/Modal/ModalItem';
import SentScreen from './SentScreen';
import DraftScreen from './DraftScreen';
import uuid from 'react-native-uuid';
import Trash from '../../assets/img/trash.png';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Notification = observer(() => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const {navigate} = useNavigation();

  const [receivers, setReceivers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentRoute, setCurrentRoute] = useState('received');
  const [draftMessage, setDraftMessage] = useState({});
  const {id: draftId, sender, parentid: draftParentId} = draftMessage;

  const {
    socket,
    users,
    receivedMessages,
    sentMessages,
    draftMessages,
    totalReceived,
    totalSent,
    totalDraft,
  } = messageStore;

  useEffect(() => {
    messageStore.fetchUsers();
    messageStore.fetchTotalReceived();
    messageStore.fetchTotalDraft();
    messageStore.fetchTotalSent();
  }, []);

  useEffect(() => {
    messageStore.fetchReceivedMessages('received');
    messageStore.fetchSentMessages('sent');
    messageStore.fetchDraftMessages('draft');
  }, [currentRoute]);

  useEffect(() => {
    socket.on('receivedMessage', msg => {
      const newMessage = {...msg, readers: ['John']};
      messageStore.appendMessage('received', newMessage);
    });
    socket.on('sentMessage', msg => {
      messageStore.appendMessage('sent', msg);
    });
    socket.on('draftMessage', msg => {
      messageStore.appendMessage('draft', msg);
    });
    socket.on('draftMessageId', id => {
      messageStore.filterDraftMessages(id);
    });

    socket.on('deletedMessage', id => {
      messageStore.deleteMessage(id);
    });
    socket.on('sync', async id => {
      messageStore.syncReaders(id, 'John');
    });

    return () => {
      socket.off('receivedMessage');
      socket.off('sentMessage');
      socket.off('draftMessage');
      socket.off('draftMessageId');
      socket.off('deleteMessage');
      socket.off('sync');
    };
  }, [socket]);

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
  const updateMessage = async data => {
    try {
      const response = await fetch(`${URL}/messages/${draftId}`, {
        method: 'PUT',
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

  const handleUpdateMessage = () => {
    const message = {
      id: draftId,
      sender,
      recivers: selectedUser,
      body,
      subject,
      date: new Date(),
      status: 'Sent',
      parentid: draftParentId,
      involvedusers: [...selectedUser, 'John'],
      readers: selectedUser,
      holders: [...selectedUser, 'John'],
      recyclebin: [],
    };
    console.log('draftMessage', message);
    socket.emit('draftMsgId', {id: draftId, user: 'John'});
    socket.emit('sendMessage', message);
    updateMessage(message);
  };
  const handleSaveMessage = () => {
    const message = {
      id: draftId,
      sender,
      recivers: selectedUser,
      body,
      subject,
      date: new Date(),
      status: 'Draft',
      parentid: draftParentId,
      involvedusers: [...selectedUser, 'John'],
      readers: selectedUser,
      holders: [...selectedUser, 'John'],
      recyclebin: [],
    };
    socket.emit('sendDraft', message);
    updateMessage(message);
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

  const handleDraftMessage = () => {
    const id = uuid.v4();
    const message = {
      id: id,
      sender: 'John',
      recivers: selectedUser,
      body,
      subject,
      date: new Date(),
      status: 'Draft',
      parentid: id,
      involvedusers: [...selectedUser, 'John'],
      readers: selectedUser,
      holders: [...selectedUser, 'John'],
      recyclebin: [],
    };
    socket.emit('sendDraft', message);
    postMessage(message);
  };

  const deleteMultipleMessage = async data => {
    try {
      const response = await fetch(
        `${URL}/messages/move-multiple-to-recyclebin`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('Error fetching Data', error);
    }
  };

  const handleMultipleDelete = () => {
    const info = {ids: selectedItems, user: 'John'};
    socket.emit('multipleDelete', info);
    deleteMultipleMessage(info);
  };

  const renderScreen = () => {
    switch (currentRoute) {
      case 'received':
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={receivedMessages}
            renderItem={({item}) => (
              <InboxScreen
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                item={item}
              />
            )}
            keyExtractor={(item, index) => item.id.toString()}
            onEndReached={() => {
              receivedMessages.length !== totalReceived &&
                messageStore.fetchReceivedMessages('received');
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    width: '90%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {messageStore.isLoading && (
                    <ActivityIndicator size={'large'} />
                  )}
                </View>
              );
            }}
          />
        );
      case 'sent':
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={sentMessages}
            renderItem={({item}) => <SentScreen item={item} />}
            keyExtractor={item => item.id}
            onEndReached={() => {
              sentMessages.length !== totalSent &&
                messageStore.fetchSentMessages(currentRoute);
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    width: '90%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {messageStore.isLoading && (
                    <ActivityIndicator size={'large'} />
                  )}
                </View>
              );
            }}
          />
        );
      case 'draft':
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={draftMessages}
            renderItem={({item}) => (
              <DraftScreen
                item={item}
                draftMessage={draftMessage}
                setDraftMessage={setDraftMessage}
                setSubject={setSubject}
                setBody={setBody}
                setSelectedUser={setSelectedUser}
              />
            )}
            keyExtractor={item => item.id}
            onEndReached={() => {
              draftMessages.length !== totalDraft &&
                messageStore.fetchDraftMessages('draft');
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    width: '90%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {messageStore.isLoading && (
                    <ActivityIndicator size={'large'} />
                  )}
                </View>
              );
            }}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <ModalItem
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        receivers={receivers}
        setSubject={setSubject}
        subject={subject}
        setBody={setBody}
        body={body}
        handleSendMessage={handleSendMessage}
        handleDraftMessage={handleDraftMessage}
        handleUpdateMessage={handleUpdateMessage}
        handleSaveMessage={handleSaveMessage}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <BackButton onPress={() => navigate('HomeScreen')} />
        {selectedItems.length ? (
          <TouchableWithoutFeedback onPress={() => handleMultipleDelete()}>
            <Image source={Trash} style={{width: 25, height: 25}} />
          </TouchableWithoutFeedback>
        ) : (
          <Text style={styles.text}>Notification</Text>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <MessageButton
          title="Inbox"
          value={totalReceived}
          onPress={() => setCurrentRoute('received')}
        />
        <MessageButton
          title="Sent"
          value={totalSent}
          onPress={() => setCurrentRoute('sent')}
        />
        <MessageButton
          title="Draft"
          value={totalDraft}
          onPress={() => setCurrentRoute('draft')}
        />
      </View>
      <View
        style={{
          marginTop: 20,
        }}>
        <View style={{marginBottom: 40}}>
          {renderScreen()}
          {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={currentRoute === 'received' && receivedMessages}
            renderItem={({item}) => renderScreen(item)}
            keyExtractor={(item, index) => item.id + index}
            onEndReached={() =>
              messageStore.fetchReceivedMessages(currentRoute)
            }
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
          /> */}
        </View>
      </View>
      <Pressable
        onPress={() => messageStore.setModalVisible(true, 'global')}
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
