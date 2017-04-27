import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class Orange1030Comment extends Component {
    render() {
        let headSource;

        switch (parseInt(this.props.model.head)) {
            case 31:
                headSource = require('../../../../assets/image/my_head_Icon_31.png');
                break;
            case 32:
                headSource = require('../../../../assets/image/my_head_Icon_32.png');
                break;
            case 33:
                headSource = require('../../../../assets/image/my_head_Icon_33.png');
                break;
            case 34:
                headSource = require('../../../../assets/image/my_head_Icon_34.png');
                break;
            case 35:
                headSource = require('../../../../assets/image/my_head_Icon_35.png');
                break;
            case 36:
                headSource = require('../../../../assets/image/my_head_Icon_36.png');
                break;
            case 37:
                headSource = require('../../../../assets/image/my_head_Icon_37.png');
                break;
            case 38:
                headSource = require('../../../../assets/image/my_head_Icon_38.png');
                break;
            case 39:
                headSource = require('../../../../assets/image/my_head_Icon_39.png');
                break;
            case 40:
                headSource = require('../../../../assets/image/my_head_Icon_40.png');
                break;
            case 41:
                headSource = require('../../../../assets/image/my_head_Icon_41.png');
                break;
            case 42:
                headSource = require('../../../../assets/image/my_head_Icon_42.png');
                break;
            default:
                headSource = require('../../../../assets/image/default_head_icon.png');
        }

        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Image style={styles.image} source={headSource} />
                    <View style={styles.content}>
                        <Text style={styles.user}>{this.props.model.mobile}</Text>
                        <Text style={styles.comment}>{this.props.model.comment}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{this.props.model.time}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 58,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info:{
        flexDirection: 'row',
    },
    image: {
        marginLeft: 15,
        marginTop: 12,
        width: 25,
        height: 25
    },
    content: {
        marginLeft: 10
    },
    user: {
        marginTop: 10,
        fontSize: 12,
        color: '#969696'
    },
    comment: {
        fontSize: 12,
        color: '#787878',
        marginBottom: 11
    },
    time: {
        fontSize: 11,
        color: '#969696',
        marginRight: 15,
        marginTop:10
    }
});