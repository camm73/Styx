import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, StyleSheet, Image, CommonStyles} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27

class HomeScreen extends Component {
    render() {
      return (
        <View style={styles.home}>
          <Text style={styles.textLabel}>Styx</Text>
          <Button
            title="Go to Settings"
            onPress={() => this.props.navigation.navigate('SettingsScreen')}
          />
          <Button
            title="Go to Data"
            onPress={() => this.props.navigation.navigate('DataScreen')}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    home: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: 'white'
    },
  
    textLabel: {
      fontSize: 24
    },
  
  });

  export default HomeScreen;