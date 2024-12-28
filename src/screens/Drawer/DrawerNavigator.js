import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import People from './People';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="User"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="People"
        component={People}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
