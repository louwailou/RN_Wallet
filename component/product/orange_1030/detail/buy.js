import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class Orange1030Buy extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoDesContainer}>
                        <View style={styles.safeScopeForText}>
                            <Text style={styles.safeScope}>保障范围</Text>
                        </View>
                        <Text style={styles.safeDes}>履约保证保险</Text>
                    </View>
                    <View style={styles.infoDesContainer}>
                        <Text style={styles.attentionCount}>{this.props.model.attentionCount}</Text>
                        <Text style={styles.attentionCountHint}>人正在关注</Text>
                    </View>
                </View>
                {
                    (this.props.investTime <= 0 && this.props.model.remainingMoney > 0) ?
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={styles.buyButton} onPress={() =>
                                console.log('piang==>购买')
                            }>
                                <Text style={styles.alertTitle}>抢购</Text>
                            </TouchableOpacity>
                            <TextInput style={styles.input} keyboardType='decimal-pad' placeholder='100元起投哦～'></TextInput>
                        </View>
                        :
                        (this.props.investTime > 0) ?
                            (this.props.investTime < 300) ?
                                <View style={[styles.alert, { backgroundColor: '#F99734' }]} >
                                    <Text style={styles.alertTitle}>
                                        {parseInt(parseInt(this.props.investTime / 60) % 60 / 10)}{parseInt(this.props.investTime / 60) % 60 % 10}:{parseInt(this.props.investTime % 60 / 10)}{this.props.investTime % 60 % 10} 后开抢
                                    </Text>
                                </View>
                                :
                                (this.props.alertOrange) ?
                                    <View style={[styles.alert, { backgroundColor: 'gray' }]} >
                                        <Text style={styles.alertTitle}>
                                            已设置，开抢前5分钟提醒
                                        </Text>
                                    </View>
                                    :
                                    <TouchableOpacity style={[styles.alert, { backgroundColor: '#F99734' }]} onPress={() =>
                                        console.log('piang==>设置提醒')
                                    }>
                                        <Text style={styles.alertTitle}>
                                            开抢前提醒我
                                        </Text>
                                    </TouchableOpacity>
                            :
                            (this.props.model.holdAmount > 0) ?
                                <TouchableOpacity style={[styles.alert, { backgroundColor: '#F99734' }]} onPress={() =>
                                    console.log('piang==>还有机会')
                                }>
                                    <Text style={styles.alertTitle}>
                                        还有机会
                                    </Text>
                                </TouchableOpacity>
                                :
                                <View style={[styles.alert, { backgroundColor: '#D2D2D2' }]} >
                                    <Text style={styles.alertTitle}>
                                        已抢光
                                    </Text>
                                </View>

                }
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() =>
                        console.log('piang==>往期十点半')
                    }>
                        <Text style={styles.pastTitle}>往期橙色十点半 ></Text>
                    </TouchableOpacity>
                    {
                        (this.props.investTime <= 0 && this.props.model.remainingMoney == 0) ?
                            <Text style={styles.buyCount}>
                                {this.props.model.buyCount}
                                <Text style={styles.buyCountHint}>个人抢购成功，拼的就是手快！</Text>
                            </Text>
                            :
                            <View></View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 151,
    },
    infoContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
        marginRight: 15,
        justifyContent: 'space-between',
    },
    infoDesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15,
        height: 42,
        borderColor: '#F99734',
        borderWidth: 0.5,
        flexDirection: 'row-reverse',
    },
    bottomContainer: {
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    safeScopeForText: {
        width: 44,
        height: 14,
        backgroundColor: '#82BF00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeScope: {
        fontSize: 9,
        color: '#FFFFFF',
    },
    safeDes: {
        fontSize: 11,
        color: '#25232E',
        marginLeft: 5
    },
    attentionCount: {
        fontSize: 11,
        color: '#F99734'
    },
    attentionCountHint: {
        fontSize: 11,
        color: '#787878'
    },
    alert: {
        marginTop: 20,
        marginRight: 15,
        marginLeft: 15,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertTitle: {
        color: '#FFFFFF',
        fontSize: 17
    },
    input: {
        height: 42,
        flex: 1,
        marginLeft: 10
    },
    buyButton: {
        height: 42,
        width: 70,
        backgroundColor: '#F99734',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pastTitle: {
        fontSize: 12,
        color: '#F99734'
    },
    buyCount: {
        fontSize: 10,
        color: '#F9840F'
    },
    buyCountHint: {
        fontSize: 10,
        color: '#787878'
    }
});