import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, PixelRatio, Dimensions, Alert} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PhotoUpload from 'react-native-photo-upload';
import {ListItem, Overlay, Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class ProfileScreen extends React.Component {
    state = {
      isVisible: false,
      edit: 'Name',
      nameText: '',
      ageText: '',
      heightText: '',
      weightText: '',
      tempText: '',
      avatarSource: {uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'}
      //add getAvatar function to retreive photo from DB if one exists
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
      }
    }

    setText(input){
      if(input === "Name"){
       this.setState({nameText:this.state.tempText});
      }else if(input === "Age"){
        this.setState({ageText:this.state.tempText});
      }else if(input === "Height"){
        this.setState({heightText:this.state.tempText});
      }else if (input === "Weight"){
        this.setState({weightText:this.state.tempText});
      }
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
                    console.log(item.title);
                  }}
                />
              </View>
            ))
          }
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
    backgroundColor: "#00BFFF",
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
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
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
    padding: 12
  }
});

export default ProfileScreen;