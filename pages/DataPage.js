import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, StyleSheet, Image, CommonStyles} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27

class DataScreen extends Component {
    render() {
      return (
          <View style={styles.data}>
            <Text style={styles.textLabel}>Data Screen!</Text>
            <Button 
              title="Go Home"
              onPress={() => this.props.navigation.navigate('HomeScreen')} 
              />
  
          </View>
  
      );
    }
  }

  const styles = StyleSheet.create({
    data: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
  
    textLabel: {
      fontSize: 24
    },
  
  });

  export default DataScreen;