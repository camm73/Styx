import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class Spacer extends Component {
    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
    }

    render = () => {
        const {height, width} = this.props;

        return(
            <View height={height}
            width={width}>
            </View>
        )
    }
}

export default Spacer;