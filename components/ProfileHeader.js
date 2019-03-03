import React from 'react';
import {withNavigation} from 'react-navigation';
import {View, StyleSheet, Button, Text} from 'react-native';

class ProfileHeader extends React.Component {

    render() {
        return(
            <View style={styles.header}>
                <View style={styles.spacer}>
                    <Button title='Go Back' onPress={() => {
                        this.props.navigation.goBack();
                    }}/>
                </View>
                <Text style={styles.headerText}>Profile</Text>
                <View style={styles.spacer}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 40,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
        //TODO: header styling
    },
    
    headerText: {
        flex: 1,
        fontSize: 24,
        textAlign: 'center'
    },

    spacer: {
        flex: 1,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default withNavigation(ProfileHeader);