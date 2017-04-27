


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

export default class NewConmerAgreement extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View>

                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={[styles.backView, { borderBottomWidth: 0.5, borderColor: '#EBEBEB' }]}>

                        <Text style={styles.title}>{this.props.model.title}</Text>
                        <View style={styles.view}>
                            <Text style={styles.subtitle}>{this.props.model.subTitle}</Text>
                            <Image source={require('../../../../assets/image/rightArrow.png')} style={styles.arrow} />
                        </View>

                    </View>
                </TouchableOpacity>

            </View>

        );
    }
}


const styles = StyleSheet.create({

    backView: {
        height: 54,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1

    },
    view: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    title: {
        marginLeft: 20,
        color: '#000000',
        fontSize: 16

    },
    subtitle: {
        marginRight: 10,
        color: '#999999',
        fontSize: 14

    },
    arrow: {
        marginRight: 20,
        width: 6,
        height: 11

    },

});

