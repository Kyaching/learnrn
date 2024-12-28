import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeTabNavigator from '../HomeScreen/HomeTabNavigator';

const Main = () => {
  return (
    <View style={{flex: 1}}>
      <HomeTabNavigator />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
