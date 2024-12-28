import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './src/screens/Drawer/MainScreen';
import {messageStore} from './src/store/messageStore';

const Stack = createNativeStackNavigator();

const App = () => {
  const {socket} = messageStore;

  useEffect(() => {
    socket.connect();
    socket.on('connection', () => {
      console.log('Connected', socket.id);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [socket]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="main"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
