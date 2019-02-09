import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, StyleSheet, Image, CommonStyles} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import {AppContainer} from './navigators/MainNavigator'


export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SafeAreaView style={styles.header} />
      <AppContainer />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    flex:0, 
    backgroundColor: 'white'
  },

  footer: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'lightgray'
  }

});