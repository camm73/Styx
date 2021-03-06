import React from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TouchableOpacity, PixelRatio, Dimensions, Alert} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PhotoUpload from 'react-native-photo-upload';
import {ListItem, Overlay, Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {selectContact} from 'react-native-select-contact';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class ProfileScreen extends React.Component {
  constructor(props){
    super(props);

    this.restoreData();
  }

    state = {
      isVisible: false,
      edit: 'Name',
      nameText: '',
      ageText: '',
      heightText: '',
      weightText: '',
      mentor: '',
      mentorName: '',
      tempText: '',
      avatarSource: {uri: 'http://styxhealth.com/assets/images/cameron-1-510x340.jpg'}
    }
  
    getText(input){
      if(input === "Name"){
        return ":  " + this.state.nameText;
      }else if(input === "Age"){
        return ":  " + this.state.ageText;
      }else if(input === "Height"){
        return ":  " + this.state.heightText;
      }else if (input === "Weight"){
        return ":  " + this.state.weightText;
      }else if (input === "Mentor"){
        return ":  " + this.state.mentorName;
      }
    }

    setText(input){
      if(input === "Name"){
       this.setState({nameText: this.state.tempText});
      }else if(input === "Age"){
        this.setState({ageText:this.state.tempText});
      }else if(input === "Height"){
        this.setState({heightText:this.state.tempText});
      }else if (input === "Weight"){
        this.setState({weightText:this.state.tempText});
      }
    }

    saveData(input){
      if(input === "Name"){
        console.log('Name Text: ' + this.state.tempText);
        AsyncStorage.setItem('Name', this.state.tempText);
      }else if(input === "Age"){
        AsyncStorage.setItem('Age', this.state.tempText);
      }else if(input === "Height"){
        AsyncStorage.setItem('Height', this.state.tempText);
      }else if(input === "Weight"){
        AsyncStorage.setItem('Weight', this.state.tempText);
      }
    }

    restoreData(){
      AsyncStorage.getItem('Name').then(value => {
        this.setState({nameText: value});
      });
      
      AsyncStorage.getItem('Age').then(value => {
        this.setState({ageText: value});
      });

      AsyncStorage.getItem('Height').then(value => {
        this.setState({heightText: value});
      });

      AsyncStorage.getItem('Weight').then(value => {
        this.setState({weightText: value});
      });

      AsyncStorage.getItem('Mentor').then(value => {
        let mentArray = JSON.parse(value);
        this.setState({mentor: mentArray});
        this.setState({mentorName: mentArray.name});
      })
    }

    saveMentor(data){
      AsyncStorage.setItem('Mentor', JSON.stringify(data)).then(() => {
        console.log('Saving mentor.')
      });
    }

    static navigationOptions = {
        header: () => {
            return(
            <ProfileHeader />
            )
        }
    }

    getPlaceholderText(input){
      if(input === "Name"){
        return "Full Name";
      }else if(input === "Age"){
        return "Age";
      }else if (input === "Height"){
        return "Height"
      }else if (input == "Weight"){
        return "Weight"
      }
    }

    getKeyboardType(input){
      if(input === 'Name'){
        return 'default';
      }else if (input === "Age"){
        return 'numeric';
      }else if (input == "Height"){
        //TODO want this to be a selector
      }else if (input === "Weight"){
        return 'numeric';
      }
    }


    render() {
        return(
        <View style={styles.container}>
          <View style={styles.header}>
          <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  console.log('Image base64 string: ', avatar);
                  this.setState({avatarSource:avatar.uri});
                }
              }}
            >
              <Image
                style={{
                  paddingVertical: 30,
                  width: 150,
                  height: 150,
                  borderRadius: 75
                }}
                resizeMode='cover'
                source={this.state.avatarSource}
              />
            </PhotoUpload>
          </View>
          <View style={styles.body}>

            <Overlay
              isVisible={this.state.isVisible}
              windowBackgroundColor="rgba(0, 0, 0, .5)"
              overlayBackgroundColor="lightgray"
              width= {screenWidth - 20}
              height= {screenHeight/4}
              overlayStyle={styles.overlay}
            >
              <Text style={styles.overlayText}>{this.state.edit}</Text>
              
              <Input
                placeholder={this.getPlaceholderText(this.state.edit)}
                keyboardType={this.getKeyboardType(this.state.edit)}
                leftIconContainerStyle={styles.overlayIcon}
                maxLength = {26}
                onChangeText={(text) => {
                  this.setState({tempText:text});
                }}
                leftIcon={
                  <Icon
                    name='user'
                    size={24}
                    color='black'
                  />
                }
              />

              <Button 
              title='Save'
              style={styles.overlayButton}
              onPress={() => {
                if(this.state.tempText != ""){
                  this.setState({isVisible: false});
                  this.setText(this.state.edit);
                  this.saveData(this.state.edit);
                  this.setState({tempText:""});
                }else{
                  this.setState({isVisible: false});
                }
              }}/>
            </Overlay>

          {
            list.map((item, i) => (
              <View style={styles.listContainer}>
                <ListItem
                  Component= {TouchableOpacity}
                  key={i}
                  title={item.title + this.getText(item.title)}
                  leftIcon={ {
                    name: item.icon,
                    size: 32
                  }}
                  containerStyle = {styles.contentContainer}
                  onPress = {() => {
                    this.setState({isVisible: true});
                    this.setState({edit: item.title});
                    console.log("Editting: " + item.title);
                  }}
                />
              </View>
            ))
          }
          <View style={styles.listContainer}>
            <ListItem 
              Component = {TouchableOpacity}
              key = {list.length}
              title={"Mentor" + this.getText("Mentor")}
              leftIcon = {
                <Icon name = 'support' size={28}/>
              }
              containerStyle = {styles.contentContainer}
              onPress = {() => {
                return selectContact().then(selection => {
                  if(!selection){
                    return null;
                  }
                  this.saveMentor(selection);
                  this.setState({mentor: selection})
                  this.setState({mentorName: selection.name});
                });
              }}
            />
          </View>
        </View>
      </View>
        );
    }
}


const list = [
  {
    title: "Name",
    icon: "account-circle"
    //material UI icon names
  },

  {
    title: "Age",
    icon: "edit" //may find better ones in the future
  },

  {
    title: "Height",
    icon: "directions-run" //change this
  },

  {
    title: "Weight",
    icon: "timelapse"
  }
]


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#4c88cd",
    height:200,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },

  contentContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 30
  },

  overlay: {
    borderRadius: 10
  },

  overlayText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 15
  },

  overlayIcon: {
    padding: 10
  },

  overlayButton: {
    padding: 20
  },

  listContainer: {
    padding: 12,
  }
});

export default ProfileScreen;