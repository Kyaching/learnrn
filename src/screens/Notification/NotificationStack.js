import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notification from './Notification';
import DetailsScreen from './DetailsScreen/DetailsScreen';

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;

const styles = StyleSheet.create({});
