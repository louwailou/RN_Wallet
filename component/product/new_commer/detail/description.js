


"use strict";
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

export default class NewConmerProductDesc extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={{ height: 10, backgroundColor: '#F7F6F8' }}> </Text>

                </View>
                <View style={{ height: 54, backgroundColor: '#FFFFFF', flexDirection: 'row', flex: 1, alignItems: 'center' }}>

                    <Image source={require('../../../../assets/image/productDescImg.png')} style={{ resizeMode: 'contain', marginLeft: 20, width: 60, height: 17 }} />

                    <Text style={{ marginLeft: 10, fontSize: 14, color: '#333333' }}>{this.props.productDesc}</Text>

                </View>
            </View>
        );
    }
}

