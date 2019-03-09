import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class Spacer extends Component {

    render(){
        return(
            <View style={styles.main}>
            </View>
        )
    }
}


styles = StyleSheet.create({
    main: {
        height: 18,
        width: 0
    }
});

export default Spacer;