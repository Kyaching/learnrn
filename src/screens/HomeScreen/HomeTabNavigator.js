import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ScheduleTasks from '../ScheduleTasks/ScheduleTasks';
import HomeFilled from '../../assets/img/home_alt_fill.png';
import HomeImg from '../../assets/img/home.png';
import CalenderFilled from '../../assets/img/calendar_fill.png';
import Calender from '../../assets/img/calendar.png';
import Notification from '../Notification/Notification';
import BellImg from '../../assets/img/bell.png';
import BellFillImg from '../../assets/img/bell_fill.png';
import {messageStore} from '../../store/messageStore';
import {observer} from 'mobx-react-lite';

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
        name="notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <NotificationTabIcon focused={focused} />,
          // tabBarBadge:
          //   messageStore.messages.length > 0
          //     ? messageStore.messages.length
          //     : null,
        }}
      />
    </Tab.Navigator>
  );
});

export default HomeTabNavigator;

const styles = StyleSheet.create({});
