


"use strict";
import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

export default class NewConmerSafety extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        // 这块优化循环创建
        let model1 = this.props.detailModel.safetyList[0];
        let model2 = this.props.detailModel.safetyList[1];
        return (

            <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>

                <View style={{ flex: 1, paddingTop: 25, paddingBottom: 25 }}>
                    {/*1*/}
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={{ uri: model1.icon }} style={{ marginLeft: 20, width: 36, height: 36 }} />

                        </View>

                        <View>
                            <Text style={styles.subtitle}>{model1.title}</Text>
                            {/*<Text style={styles.desc}>{model1.content}</Text>*/}
                        </View>
                    </View>

                    {/*2*/}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View>
                            <Image source={{ uri: model2.icon }} style={{ marginLeft: 20, width: 36, height: 36 }} />

                        </View>

                        <View>
                            <Text style={styles.subtitle}>{model2.title}</Text>
                            {/*<Text style={styles.desc}>{model2.content}</Text>*/}
                        </View>

                    </View>

                </View>

                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={{ uri: model2.seal }} style={{ resizeMode: 'contain', marginTop: -67.5, marginRight: 15, width: 65, height: 53 }} />

                </View>
                <Text style={{ height: 10, backgroundColor: '#F7F6F8' }}> </Text>
            </View>

        );
    }
}


const styles = StyleSheet.create({

    subtitle: {
        marginLeft: 14,
        fontSize: 16,
        color: '#333333',
        height: 36,
        paddingVertical:10,
        fontWeight: '500',
    },
    desc: {
        marginLeft: 14,
        marginTop: 2,
        fontSize: 12,
        color: '#999999',
        height: 16.5
    }

});

