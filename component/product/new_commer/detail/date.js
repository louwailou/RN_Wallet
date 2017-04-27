


"use strict";
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

import moment from 'moment'

export default class NewConmerDate extends Component {
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

                <View style={{ height: 117.5, backgroundColor: '#FFFFFF', justifyContent: 'center' }}>

                    <View style={[styles.view, { marginLeft: 20, marginRight: 20, marginBottom: 10 }]}>
                        <Text style={[styles.text1]}>支付成功,开始计息</Text>
                        <Text style={[styles.text1]}>项目到期,坐享收益</Text>
                    </View >

                    <View style={[styles.view, { marginLeft: 20, marginRight: 20, marginBottom: 10 }]}>
                        <Image source={require('../../../../assets/image/success.png')} style={{ margin: 1, width: 6.5, height: 9 }} />
                        <Image source={require('../../../../assets/image/dottedline@2x.png')} style={{ marginLeft: 6, marginRight: 6 }} />
                        <Image source={require('../../../../assets/image/deadline.png')} style={{ margin: 1, width: 6.5, height: 9 }} />
                    </View >

                    <View style={[styles.view, { marginLeft: 20, marginRight: 20 }]}>
                        <Text style={[styles.text2, { padding: 4.5, backgroundColor: '#D6DBDF' }]}>今日</Text>
                        <Text style={[styles.text2, { padding: 4.5, backgroundColor: '#93C3F2' }]}>{
                            moment(this.props.detailModel.profitTime).format('YYYY-MM-DD')}</Text>
                    </View >

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'

    },
    text1: {
        height: 16.5,
        color: '#999999',
        fontSize: 12,
        textAlign: 'center',
        flex: 1,

    },

    text2: {
        margin: 1,
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
        flex: 1,
        height: 21,
    },
});