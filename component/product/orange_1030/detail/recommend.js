import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class Orange1030Recommend extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hint}>没抢到？这个收益也不错哦～</Text>
                <View style={styles.background}>
                    <Text style={styles.productName}>{this.props.model.recommendProduct.productName}{this.props.model.recommendProduct.productSubName}</Text>
                    <View style={styles.dataContainer}>
                        <View>
                            <View style={styles.eachDataContainer}>
                                <Text style={styles.yearYield}>{this.props.model.recommendProduct.profit}</Text>
                                <Text style={styles.unit}>%</Text>
                            </View>
                            <Text style={styles.yearYieldHint}>预期年化</Text>
                        </View>
                        <View>
                        <View style={styles.eachDataContainer}>
                            <Text style={styles.period}>{this.props.model.recommendProduct.period}</Text>
                            <Text style={styles.unit}>{this.props.model.recommendProduct.periodUnit}</Text>
                        </View>
                                                <Text style={styles.periodHint}>封闭期</Text>
                        </View>
                        <TouchableOpacity style={styles.recommendButton} onPress={() =>
                            console.log('piang==>Touchable')
                        }>
                            <Text style={styles.recommendButtonTitle}>去看看</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 117,
        backgroundColor: '#F7F6F8'
    },
    hint: {
        fontSize: 12,
        color: '#969696',
        marginTop: 10,
        textAlign: 'center'
    },
    background: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        backgroundColor: 'white'
    },
    productName: {
        marginLeft: 15,
        marginTop: 10,
        fontSize: 13,
        color: '#000000'
    },
    dataContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    eachDataContainer: {
        flexDirection: 'row'
    },
    yearYield: {
        marginLeft: 15,
        fontSize: 24,
        color: '#000000'
    },
    unit: {
        fontSize: 13,
        color: '#000000',
        marginTop: 10
    },
    period: {
        fontSize: 24,
        color: '#000000'
    },
    recommendButton: {
        marginRight: 15,
        width: 60,
        height: 24,
        backgroundColor: '#F99734',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recommendButtonTitle: {
        color: '#FFFFFF',
        fontSize: 12
    },
    yearYieldHint: {
        fontSize: 9,
        color: '#B6B6B6',
        marginLeft: 15
    },
    periodHint: {
        fontSize: 9,
        color: '#B6B6B6',
    }
})