import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, StyleSheet, ScrollView, Image, CommonStyles} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import SettingsHeader from '../components/SettingsHeader';

class SettingsScreen extends React.Component {
    static navigationOptions = {
      header: () => {
        return(
          <SettingsHeader />
        )
      }
    }

    render() {
      return (
      <ScrollView>
        <View style={styles.settings}>
          <Text style={styles.textLabel}>Settings!</Text>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
          />
        </View>
      </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    settings: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
  
    textLabel: {
      fontSize: 24
    },
  });

  export default SettingsScreen;