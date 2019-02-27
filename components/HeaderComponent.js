import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Component} from 'react-native'; //6.2.2
import { Header } from 'react-native-elements';

const HeaderComponent = props => {
    return (
        <View style= {styles.topBar}>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('DataScreen')}>
                    <Image source={require('../res/profileIcon.png')} style = {styles.topButton}/>
                </TouchableOpacity>

                <Image source={require('../res/styxLogo.png')} style = {styles.logo}/>

                <TouchableOpacity onPress = {() => this.props.navigation.navigate('SettingsScreen')}>
                    <Image source={require('../res/settingsIcon.png')} style = {styles.topButton}/>
                </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
  
    topBar: {
      flex: 0.07,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: '#CEE3EC',
      height: 50
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

export default HeaderComponent;