import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, StyleSheet, Image, CommonStyles, Dimensions, ScrollView} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import {LineChart} from 'react-native-chart-kit';
import Spacer from '../components/Spacer';

const screenWidth = Dimensions.get('window').width;
const screnHeight = Dimensions.get('window').height;

class DataScreen extends Component {
  
    render() {
      return (
          <View style={styles.data}>
           
           <Text style={styles.chartLabel}>Quitting Progress</Text>
           <LineChart
              data={{
                
                datasets: [{
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }]
              }}
              width={screenWidth - 40}
              height={240}
              yAxisLabel={'$'}
              chartConfig={{
                backgroundColor: '#FF0000', //#022173
                backgroundGradientFrom: '#4c88cd',
                backgroundGradientTo: '#2e64a2',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style = {{
                marginVertical: 8,
                borderRadius: 16
              }}
            />

            <Spacer height={25}/>

            <Text style={styles.breakdownLabel}>Daily Breakdown</Text>

            <View style={styles.scrollViewContainer}>
              <ScrollView style={styles.dataTable}>

              </ScrollView>
            </View>
  
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

    chartLabel:{
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'Raleway-Regular'
    },
    
    dataTable: {
      backgroundColor: 'lightgray',
      height: 40,
      width: screenWidth - 40,
      borderRadius: 20
    },

    scrollViewContainer: {
      height: 240,
      width: screenWidth - 40,
    },

    breakdownLabel: {
      fontSize: 18,
      fontFamily: 'Raleway-Regular'
    }
  
  });

  export default DataScreen;