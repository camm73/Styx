import React from 'react';
import {withNavigation} from 'react-navigation';
import {View, StyleSheet, Button} from 'react-native';
import {Icon} from 'react-native-elements';

class SettingsHeader extends React.Component {

    render() {
        return(
            <View style={styles.header}>
                <Icon name="arrow-back" size={32} onPress={() => {
                        this.props.navigation.goBack();
                    }} />
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
        paddingLeft: 20
        //TODO: header styling
    }

});

export default withNavigation(SettingsHeader);