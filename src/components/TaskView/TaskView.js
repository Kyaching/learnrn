import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TodoImg from '../../assets/img/todo.png';
import moment from 'moment';

const TaskView = ({name, startDate}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#F1F4FF',
        marginBottom: 5,
      }}>
      <View
        style={{
          backgroundColor: '#176FF2',
          width: 60,
          height: 60,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={TodoImg} />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Text>{name}</Text>
        <Text>{moment(startDate).startOf('day').fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskView;

const styles = StyleSheet.create({});
