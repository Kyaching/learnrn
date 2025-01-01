import {Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ScheduleTasks from '../ScheduleTasks/ScheduleTasks';
import HomeFilled from '../../assets/img/home_alt_fill.png';
import HomeImg from '../../assets/img/home.png';
import CalenderFilled from '../../assets/img/calendar_fill.png';
import Calender from '../../assets/img/calendar.png';
import BellImg from '../../assets/img/bell.png';
import BellFillImg from '../../assets/img/bell_fill.png';
import {observer} from 'mobx-react-lite';
import NotificationStack from '../Notification/NotificationStack';
import {messageStore} from '../../store/messageStore';

const Tab = createBottomTabNavigator();

// Define tabBarIcon as a standalone function
const HomeTabIcon = ({focused}) => (
  <Image
    source={focused ? HomeFilled : HomeImg}
    style={{width: 32, height: 32}}
  />
);
const CalenderTabIcon = ({focused}) => (
  <Image
    source={focused ? CalenderFilled : Calender}
    style={{width: 32, height: 32}}
  />
);
const NotificationTabIcon = ({focused}) => (
  <Image
    source={focused ? BellFillImg : BellImg}
    style={{width: 32, height: 32}}
  />
);

const HomeTabNavigator = observer(() => {
  const [read, setRead] = useState([]);

  const {socket, notificationMessages} = messageStore;
  useEffect(() => {
    socket.on('sync', id => {
      setRead(prev => prev.filter(item => item.id !== id));
    });
    messageStore.fetchNotificationMessages();
    setRead(notificationMessages);
  }, [socket, notificationMessages]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <HomeTabIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ScheduleTask"
        component={ScheduleTasks}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <CalenderTabIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="NotiStack"
        component={NotificationStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <NotificationTabIcon focused={focused} />,
          tabBarBadge: read.length > 0 ? read.length : null,
        }}
      />
    </Tab.Navigator>
  );
});

export default HomeTabNavigator;

const styles = StyleSheet.create({});
