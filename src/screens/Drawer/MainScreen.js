import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';

const MainScreen = () => {
  return (
    <View style={{flex: 1}}>
      <DrawerNavigator />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
