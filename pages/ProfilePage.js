import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, PixelRatio} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PhotoUpload from 'react-native-photo-upload';
import {ListItem} from 'react-native-elements';


class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: () => {
            return(
            <ProfileHeader />
            )
        }
    }

    render() {
        return(
        <View style={styles.container}>
          <View style={styles.header}>
          <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  console.log('Image base64 string: ', avatar)
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
                source={{
                  uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                }}
              />
            </PhotoUpload>
          </View>
          <View style={styles.body}>
          {
            list.map((item, i) => (
              <ListItem
                Component= {TouchableOpacity}
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                containerStyle = {styles.contentContainer}
                onPress = {() => {
                  //Set edit overlay to visible and get the correct info
                }}
              />
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
    icon: 'av-timer'
  },
]


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
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
    backgroundColor: 'lightgray'
  }
});

export default ProfileScreen;