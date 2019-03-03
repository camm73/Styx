import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Alert, AppState, Text, View, Image, TouchableOpacity} from 'react-native'; //6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import {AppContainer} from './navigators/MainNavigator';
import {HomeScreen, updateAnimState} from './pages/StyxPage';
import { Button, Header } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';


export default class App extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  componentWillMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      
      updateAnimState();
    }
    this.setState({appState: nextAppState});
  };


  render() {
    return (
      <React.Fragment>
        <SafeAreaView style={styles.header} />
      <AppContainer  onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        
        //Trigger re-animation of circular progress bar when going back to home screen.
        if ((prevScreen !== currentScreen) && (currentScreen == 'HomeScreen')) {
          updateAnimState();
          }
        }}/>
      </React.Fragment>
    );
  }
}

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const styles = StyleSheet.create({

  header: {
    flex:0, 
    backgroundColor: 'white'
  },

  topBar: {
    flex: 0.07,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#CEE3EC'
  },

  footer: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'lightgray'
  },

  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain'
  },

  topButton: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  }

});