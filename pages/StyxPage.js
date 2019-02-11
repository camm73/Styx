import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, Easing, Dimensions, Alert} from 'react-native'; // 6.2.2
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom, SafeAreaView } from 'react-navigation'; // 1.0.0-beta.27
import { AnimatedCircularProgress, CircularProgress } from 'react-native-circular-progress';


const MAX_POINTS = 100;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const animDuration = 2500;
const animEase = Easing.inOut(Easing.ease);
const circProgress = React.createRef();

class HomeScreen extends Component {
  state = {
    isMoving: false,
    pointsDelta: 0,
    points: 80
  };

    render() {
      const fill = this.state.points / MAX_POINTS * 100;

      return (
        <ScrollView contentContainerStyle={styles.home}>
           <AnimatedCircularProgress
              size={250}
              width={12}
              fill = {fill}
              duration = {animDuration}
              easing = {Easing.inOut(Easing.ease)}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
              ref= {circProgress}
              >
              

              {(fill) => (
                <Text style={styles.points}>
                  { Math.round(MAX_POINTS * fill / 100) + '% \n Budget'}
                </Text>
              )}
              
          </AnimatedCircularProgress>
        </ScrollView>
      );
    }
  }

  //Move this to the backend eventually; will retreive this either from memory or database
  function getFillPercentage() {
    return (80);
  }

  export function resartAnimation(){
    //circProgress.reAnimate(0, 80, animDuration, animEase);
    //TODO: Fix the TypeError occurring on circProgress
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

    points: {
      backgroundColor: 'transparent',
      textAlign: 'center',
      justifyContent: 'center',
      color: '#7591af',
      fontSize: 50,
      fontWeight: "100",
    },
  
  });

  export default HomeScreen;