import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Alert, AppState, Text} from 'react-native'; //6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import {AppContainer} from './navigators/MainNavigator';
import {HomeScreen, updateAnimState} from './pages/StyxPage';
import { Button } from 'react-native-elements';


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

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      //TODO: make lessy jumpy animation when opening the app
      
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

  footer: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'lightgray'
  }

});