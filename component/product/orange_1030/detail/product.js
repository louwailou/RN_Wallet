import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ProgressViewIOS
} from 'react-native';

export default class Orange1030Product extends Component {

    test() {
        console.log('789')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.productTitle}>编号:{this.props.model.productName}</Text>
                    <TouchableOpacity onPress={() =>
                        this.props.onChildHanlder()
                    }>
                        <Text style={styles.detailButton}>详情 ></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productDataContainer}>
                    <Text style={styles.yearYield}>{this.props.model.profit.toFixed(2)}
                        <Text style={styles.yearYieldUnit}>%</Text>
                    </Text>
                    <Text style={styles.period}>{this.props.model.period}{this.props.model.periodUnit}</Text>
                    <Text style={styles.minInvest}>{this.props.model.minInvestAmount}元</Text>
                </View>
                <View style={styles.productDataHintContainer}>
                    <Text style={styles.productDataHint}>预期年化</Text>
                    <Text style={styles.productDataHint}>封闭期</Text>
                    <Text style={styles.productDataHint}>起投金额</Text>
                </View>
                <View style={styles.progressContainer}>
                    <ProgressViewIOS style={styles.progressView} progressTintColor='#F9840F' progress={1 - this.props.model.remainingMoney / this.props.model.sellAmount} />
                    <Text style={styles.remainPercent}>余{parseInt(this.props.model.remainingMoney / this.props.model.sellAmount * 100)}%</Text>
                </View>
                <Text style={styles.remainInvest}>剩余可投：{this.props.model.remainingMoney}元</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 190,
    },
    titleContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
        marginRight: 15,
        justifyContent: 'space-between',
    },
    progressContainer:{
        marginLeft: 15,
        marginTop: 30,
        marginRight:15,
        flexDirection:'row'
    },
    productTitle: {
        fontSize: 13,
        color: '#25232E',
    },
    detailButton: {
        marginRight: 0,
        fontSize: 13,
        color: '#969696',
    },
    productDataContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-between',
        marginTop: 15,
        alignItems: 'center',
    },
    productDataHintContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-between',
    },
    yearYield: {
        fontSize: 31,
        color: '#F9840F'
    },
    yearYieldUnit: {
        fontSize: 14,
        color: '#F9840F'
    },
    period: {
        fontSize: 18,
        color: '#000000',
        marginTop: 3,
        marginRight: 25,
    },
    minInvest: {
        fontSize: 18,
        color: '#000000',
        marginTop: 3
    },
    productDataHint: {
        fontSize: 11,
        color: '#B6B6B6'
    },
    progressView: {
        flex:1
    },
    remainPercent: {
        marginLeft:5,
        fontSize: 9,
        color: '#787878',
        marginTop:-5
    },
    remainInvest: {
        marginLeft: 15,
        marginTop: 20,
        fontSize: 11,
        color: '#787878'
    }
});