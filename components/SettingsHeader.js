import React from 'react';
import {withNavigation} from 'react-navigation';
import {View, StyleSheet, Button} from 'react-native';

class SettingsHeader extends React.Component {

    render() {
        return(
            <View style={styles.header}>
                <Button title='Go Back' onPress={() => {
                    this.props.navigation.goBack();
                }}/>
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
        borderBottomWidth: 1
        //TODO: header styling
    }

});

export default withNavigation(SettingsHeader);