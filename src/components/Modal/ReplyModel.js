import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Button from '../Button/Button';

const ReplyModal = ({
  modalVisible,
  setModalVisible,
  replySubject,
  setReplySubject,
  replyBody,
  setReplyBody,
  handleSendMessage,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>X</Text>
          </Pressable>

          <TextInput
            placeholder="Subject"
            value={replySubject}
            onChangeText={e => setReplySubject(e)}
            style={styles.inputField}
            inputMode="text"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Body"
            value={replyBody}
            onChangeText={e => setReplyBody(e)}
            style={[styles.inputField, {height: 200}]}
            inputMode="text"
            textAlignVertical="top"
            multiline
            autoCapitalize="none"
          />
          <View
            style={{flexDirection: 'row', gap: 7, justifyContent: 'flex-end'}}>
            <Button
              onPress={() => handleSendMessage()}
              label={'Send'}
              style={{width: 60}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReplyModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    overflow: 'visible',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 18,
  },
  modalText: {
    marginTop: 15,
  },
  inputField: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F1F4FF',
    width: '90%',
    height: 48,
    padding: 15,
    borderColor: '#176FF2',
  },
});
