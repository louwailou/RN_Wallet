


"use strict";
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class NewConmerProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <Text style={styles.desc}>{this.props.detailModel.productDetail}</Text>
                <Text style={{ height: 10, backgroundColor: '#F7F6F8' }}> </Text>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    desc: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 16,
        marginBottom: 20,
        color: '#666666',
        fontSize: 14,
        lineHeight: 25
    },
});

