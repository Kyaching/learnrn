import {Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import BackButton from '../BackButton/BackButton';

const CreateTask = ({isVisible, onClose}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <BackButton onPress={onClose} />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Create a Task
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput placeholder="Task name" style={styles.input} />
        </View>
      </View>
    </Modal>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    height: 70,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
  },
  label: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
