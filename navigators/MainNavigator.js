import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, StyleSheet, Image, CommonStyles} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import DataScreen from '../pages/DataPage';
import HomeScreen from '../pages/StyxPage';
import SettingsScreen from '../pages/SettingsPage';
import ProfileScreen from '../pages/ProfilePage';
import CommunityScreen from '../pages/CommunityPage';
import { Header } from 'react-native-elements';
import MainHeaderComponent from '../components/MainHeaderComponent';

const MainStack = createStackNavigator(
  {
  ProfileScreen: {
    screen: ProfileScreen,
  },

  SettingsScreen: {
    screen: SettingsScreen,
  },
  
  TabPage: {
    navigationOptions: {
      header: () => {
        return(
          <MainHeaderComponent />
        );
      },
      headerMode: 'screen',
    },
    screen: createBottomTabNavigator(
      {
        DataScreen: {
          screen: DataScreen,
          navigationOptions: {
            tabBarIcon: () => (<Image source={require('../res/dataIcon.png')} style={{height: 40, width: 40}}/>),
            tabBarLabel: 'Data',
          },
          
        },
    
        HomeScreen: { 
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: () => (<Image source={require('../res/homeIcon.png')} style={{height: 28, width: 28}} />),
            tabBarLabel: 'Home'
          },
        },
    
        CommunityScreen: { 
          screen: CommunityScreen,
          navigationOptions: {
            tabBarIcon: () => (<Image source={require('../res/communityIcon.png')} style={{height: 35, width: 35}} />),
            tabBarLabel: 'Community',
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
            bottom: 'never',
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
    
    ),

  },

},

{
  initialRouteName: 'TabPage',
  mode: 'modal'
},

);
  
  
export const AppContainer = createAppContainer(MainStack);