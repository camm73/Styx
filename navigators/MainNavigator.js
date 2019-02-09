import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, StyleSheet, Image, CommonStyles} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import DataScreen from '../pages/DataPage';
import HomeScreen from '../pages/StyxPage';
import SettingsScreen from '../pages/SettingsPage';


export const Tabs = createBottomTabNavigator(
    {
      DataScreen: {
        screen: DataScreen,
        navigationOptions: {
          tabBarIcon: () => (<Image source={require('../res/dataIcon.png')} style={{height: 25, width: 25}}/>),
          tabBarLabel: 'Data',
        },
        
      },
  
      HomeScreen: { 
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: () => (<Image source={require('../res/styxIcon.png')} style={{height: 28, width: 28}} />),
          tabBarLabel: 'Home'
        },
      },
  
      SettingsScreen: { 
        screen: SettingsScreen,
        navigationOptions: {
          tabBarIcon: () => (<Image source={require('../res/settingsIcon.png')} style={{height: 25, width: 25}} />),
          tabBarLabel: 'Settings',
        },
      },
    },
  
    {
      initialRouteName: 'HomeScreen',
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        activeBackgroundColor: 'gray',
        inactiveBackgroundColor: 'lightgray',
        safeAreaInset: {
          bottom: 'never'
        },
        tabStyle: {
          padding: 20
        },
        labelStyle: {
          padding: 15,
          height: 0
        },
        style: {
          height: 70
        }
      },
      animationEnabled: false,
      swipeEnabled: false,
    },
  
  );
  
  
export const AppContainer = createAppContainer(Tabs);