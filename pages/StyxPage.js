import React, {Component, Fragment} from 'react';
import {Text, View, StyleSheet, ScrollView, Easing, TouchableOpacity, Dimensions, Alert} from 'react-native'; // 6.2.2
import { withNavigation } from 'react-navigation'; // 1.0.0-beta.27
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StarComponent from "../components/StarComponent";
import BLEComponent from "../components/BLEComponent";
import {Button, Overlay, Icon} from 'react-native-elements';
import Spacer from "../components/Spacer";


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
    points: 80,
    withdrawalType: 'none',
    withOverlayVisible: false,
    withOptionsOverlayVisible: false,
    cravingDisabled: false,
    headacheDisabled: false,
    mentalFogDisabled: false,
    fatigueDisabled: false,
    coughDisabled: false,
    nauseaDisabled: false,
    anxietyDisabled: false,
    constipationDisabled: false,
    depressionDisabled: false,
    irritabilityDisabled: false
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

          

          <View style={styles.statsBubble}>
            <View style={styles.statsNumberContainer}>
                <Text style={styles.statsNumber}>5</Text>
                <Spacer width={80}/>
                <Text style={styles.statsNumber}>2</Text>
                <Spacer width = {80}/>
                <Text style={styles.statsNumber}>34</Text>
            </View>

            <View style={styles.statsDetailContainer}>
                <View>
                  <Text style={styles.statsText}>Hours left</Text>
                  <Text style={styles.statsText}>in period</Text>
                </View>

                <View>
                  <Text style={styles.statsText}>Relapses</Text>
                </View>

                <View>
                  <Text style={styles.statsText}>Days</Text>
                  <Text style={styles.statsText}>Remaining</Text>
                </View>
            </View>
          </View>

          {/*Spacer for two bubbles */}
          <Spacer height={30}/>

          <View style={styles.textBubble}>
                <View style = {styles.textBubbleTop}>
                  <Text style={styles.textBubbleTopText}>Experiencing withdrawal symptoms?</Text>
                </View>

                <View style={styles.textBubbleButtonContainer}> 
                  <Button title='Mild' 
                  buttonStyle = {styles.mildButton}
                  onPress={() => {
                    this.setState({
                      withdrawalType: "Mild",
                      withOverlayVisible: true
                    });
                  }}/>
                  <Button title='Medium' buttonStyle={styles.mediumButton}
                  onPress={() => {
                    this.setState({
                      withdrawalType: "Medium",
                      withOverlayVisible: true
                    });
                  }}/>
                  <Button title='Strong' buttonStyle={styles.strongButton}
                  onPress={() => {
                    this.setState({
                      withdrawalType: "Strong",
                      withOverlayVisible: true});
                    }}/>
                </View>

          </View>
          
         {/*Make sure to add back the BLE Component.
            May actually want to move it to App.js for universality*/}

          <Overlay
          isVisible={this.state.withOverlayVisible}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayBackgroundColor="lightgray"
          width= {screenWidth - 60}
          height= {screenHeight/1.8}
          overlayStyle={styles.overlay}>

          {/* View with the X to close window*/}
            <View style={styles.overlayX}>
              <TouchableOpacity>
                <Icon name='close' size={32} onPress={() => {
                  this.setState({
                    withOverlayVisible: false,
                    cravingDisabled: false,
                    headacheDisabled: false,
                    mentalFogDisabled: false,
                    fatigueDisabled: false,
                    coughDisabled: false,
                    nauseaDisabled: false,
                    anxietyDisabled: false,
                    constipationDisabled: false,
                    depressionDisabled: false,
                    irritabilityDisabled: false
                  });
                }}/>
              </TouchableOpacity>
            </View>

            <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>What are your symptoms?</Text>
            </View>

            <View style={styles.overlayButtonContainer}>
                <View style={styles.overlayButtonLeft}>
                  <Button title='Cravings' disabled={this.state.cravingDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Cravings");
                    this.setState({cravingDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Mental Fog' disabled={this.state.mentalFogDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Mental Fog");
                    this.setState({mentalFogDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Cough' disabled={this.state.coughDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse('Cough');
                    this.setState({coughDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Anxiety' disabled={this.state.anxietyDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Anxiety");
                    this.setState({anxietyDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Depression' disabled={this.state.depressionDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Depression");
                    this.setState({depressionDisabled: true});
                  }}/>
                </View>

                <View style={styles.overlayButtonRight}>
                  <Button title='Headache' disabled={this.state.headacheDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Headache");
                    this.setState({headacheDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Fatigue' disabled={this.state.fatigueDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Fatigue");
                    this.setState({fatigueDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Nausea' disabled={this.state.nauseaDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Nausea");
                    this.setState({nauseaDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Constipation' disabled={this.state.constipationDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Constipation");
                    this.setState({constipationDisabled: true});
                  }}/>
                  <Spacer height={15}/>
                  <Button title='Irritability' disabled={this.state.irritabilityDisabled} buttonStyle={styles.overlayButton} onPress={() => {
                    symptomResponse("Irritability");
                    this.setState({irritabilityDisabled: true});
                  }} />
                </View>
            </View>

            <Spacer height={15}/>

            <View style={styles.contButtonContainer}>
              <Button title="Continue" buttonStyle={styles.overlayContButton} type='clear' onPress={() => {
                //Do something for making final decision about relapse
                this.setState({
                  cravingDisabled: false,
                  headacheDisabled: false,
                  mentalFogDisabled: false,
                  fatigueDisabled: false,
                  coughDisabled: false,
                  nauseaDisabled: false,
                  anxietyDisabled: false,
                  constipationDisabled: false,
                  depressionDisabled: false,
                  irritabilityDisabled: false,
                  withOverlayVisible: false,
                  withOptionsOverlayVisible: true
                });
              }}/>
            </View>

          </Overlay>

          <Overlay style={styles.withdrawalOptionsOverlay}
          isVisible={this.state.withOptionsOverlayVisible}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayBackgroundColor="lightgray"
          width= {screenWidth - 60}
          height= {screenHeight/2.5}
          overlayStyle={styles.overlay}>

            <View style={styles.overlayX}>
              <TouchableOpacity>
                <Icon name='close' size={32} onPress={() => {
                  this.setState({
                    withOptionsOverlayVisible: false
                  });
                }}/>
              </TouchableOpacity>
            </View>
            
            <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>How would you like to proceed?</Text>
            </View>

            <View style={styles.withOptionsButtonContainer} >
                <Button title='Receive Community Support' buttonStyle={styles.commButton} onPress={() => {
                  //May change this action be more specific later
                  this.setState({withOptionsOverlayVisible: false})
                  this.props.navigation.navigate('CommunityScreen');
                  //TODO: submit this response to the database
                }} />
                <Spacer height={15}/>
                <Button title='Contact Mentor' buttonStyle={styles.mentButton} onPress={() => {
                  this.setState({withOptionsOverlayVisible: false});
                  
                  //TODO: do something about contacting mentor (open phone call or text?)
                }} />
                <Spacer height={15}/>
                <Button title='View Personal Motivations' buttonStyle={styles.motButton} onPress={() => {
                  this.setState({withOptionsOverlayVisible: false});

                  //TODO: Redirect to showing the person their personal motivations
                }} />
                <Spacer height={15}/>
                <Button title='Emergency Dosage' buttonStyle={styles.emerButton} onPress={() => {
                  this.setState({withOptionsOverlayVisible: false});

                  //TODO: enabled the emergency dosage; readjust budget; send data to database to change quitting plan
                }} />
            
            </View>

          </Overlay>

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

  function symptomResponse(type) {
    //Do stuff for displaying a new overlay if we need extra response
  }

  const styles = StyleSheet.create({
    home: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'column',
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
    },

    textBubble: {
      borderRadius: 25,
      height: 100,
      width: screenWidth - 40,
      borderWidth: 2,
      borderColor: '#CEE3EC',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    textBubbleTop:{
      alignContent: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
    },

    textBubbleTopText:{
      alignContent: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      fontSize: 20,
      fontFamily: "Optima"
    },
    
    textBubbleButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignContent: 'center',
      paddingVertical: 5
    },

    mildButton: {
      backgroundColor: 'lightblue',
      borderRadius: 30,
      width: 90
    },

    mediumButton: {
      backgroundColor: 'blue',
      borderRadius: 30,
      width: 90
    },

    strongButton: {
      backgroundColor: 'darkblue',
      borderRadius: 30,
      width: 90
    },
    
    statsBubble: {
      borderRadius: 25,
      height: 100,
      width: screenWidth - 40,
      borderWidth: 2,
      borderColor: '#CEE3EC',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    statsNumberContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },

    statsDetailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    statsNumber: {
      fontSize: 32,
      fontFamily: 'Roboto-Regular',
      color: 'teal'
    },

    statsText: {
      fontSize: 16,
      fontFamily: 'Roboto-Italic',
      color: 'gray',
      textAlign: 'center'
    },

    overlay: {
      borderRadius: 20,
    },

    overlayX: {
      flex: 0.3,
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },

    overlayTextContainer: {
      flex: 0.4,
      justifyContent: 'center',
      alignContent: 'center',
    },

    overlayText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'Optima'
    },

    overlayButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    overlayButtonLeft: {

    },

    overlayButtonRight: {

    },

    overlayButton: {
      borderRadius: 50,
      width: 125,
    },

    overlayContButton: {
      justifyContent: 'space-evenly',
      alignContent: 'center',

    },

    contButtonContainer: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },

    withdrawalOptionsOverlay: {
      borderRadius: 40
    },

    withOptionsButtonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },

    commButton: {
      borderRadius: 50,
      backgroundColor: 'lightblue'
    },

    mentButton: {
      borderRadius: 50,
      backgroundColor: 'blue'
    },

    motButton: {
      borderRadius: 50,
      backgroundColor: 'darkblue'
    },

    emerButton: {
      borderRadius: 50,
      backgroundColor: 'red'
    },
  
  });

  export default withNavigation(HomeScreen);