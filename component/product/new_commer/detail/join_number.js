


"use strict";
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import Numeral from 'numeral';

export default class NewComerJoinNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (

            <TouchableOpacity onPress={this.props.onPress}>
                <View >
                    <Text style={{ height: 10, backgroundColor: '#F7F6F8' }}> </Text>

                    <View style={{ height: 54, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>

                        <Text style={{ marginLeft: 20, color: '#000000', fontSize: 16 }}>累计参与<Text style={{ color: '#F55458', fontSize: 18 }}>{' '+ Numeral(this.props.detailModel.joinNumber).format('0,0') + ' '}</Text>人次</Text>

                        <Image source={require('../../../../assets/image/rightArrow.png')} style={styles.arrow} />

                    </View>
                    <Text style={{ height: 10, backgroundColor: '#F7F6F8' }}> </Text>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    arrow: {
        marginRight: 22.5,
        width: 6,
        height: 11

    },
});