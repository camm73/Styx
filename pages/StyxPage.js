import React, {Component, Fragment} from 'react';
import {Text, View, StyleSheet, ScrollView, Easing, Dimensions, Alert, Button} from 'react-native'; // 6.2.2
import { withNavigation } from 'react-navigation'; // 1.0.0-beta.27
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StarComponent from "../components/StarComponent";
import BLEComponent from "../components/BLEComponent";


const MAX_POINTS = 100;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const animDuration = 2500;
const animEase = Easing.inOut(Easing.ease);


class HomeScreen extends Component {

  constructor(props){
    super(props)
    updateAnimState = updateAnimState.bind(this);
  }


  state = {
    isMoving: false,
    pointsDelta: 0,
    points: 80
  };

    render() {
      const fill = this.state.points / MAX_POINTS * 100;
      return (
        <ScrollView contentContainerStyle={styles.home} ref={(ref) => this.scroll = ref}>
           <AnimatedCircularProgress
              size={250}
              width={12}
              fill = {fill}
              duration = {animDuration}
              lineCap = 'round'
              arcSweepAngle = {270}
              rotation = {224}
              easing = {Easing.inOut(Easing.ease)}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
              ref={(ref) => this.circularProgress = ref}
              >
              {(fill) => (
                <Fragment>
                  <Text style={styles.percent}>
                  { Math.round(MAX_POINTS * fill / 100) + '%'}
                </Text>

                <Text style={styles.percentText}>Budget</Text>
                </Fragment>
              )}
          </AnimatedCircularProgress>
          
         {/*Make sure to add back the BLE Component.
            May actually want to move it to App.js for universality*/}

        </ScrollView>
      );
    }
  }

  //Move this to the backend eventually; will retreive this either from memory or database
  function getFillPercentage() {
    return (80);
  }

  export function updateAnimState(){
    this.circularProgress.reAnimate(0, 40, animDuration, animEase);
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

    percent: {
      backgroundColor: 'transparent',
      textAlign: 'center',
      justifyContent: 'center',
      color: '#7591af',
      fontSize: 50,
      fontWeight: "100",
    },

    percentText: {
      backgroundColor: 'transparent',
      textAlign: 'center',
      justifyContent: 'center',
      color: '#7591af',
      fontSize: 36,
      fontWeight: "100",
    }
  
  });

  export default withNavigation(HomeScreen);