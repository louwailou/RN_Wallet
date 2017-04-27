import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Orange1030Header extends Component {

    render() {
        if (this.props.investTime > 1) {
            if (this.props.investTime > 60 * 30) {
                var playTimeHint;

                if (this.props.playTime == 1) {
                    playTimeHint = '10:30开抢';
                }
                else if (this.props.playTime == 2) {
                    playTimeHint = '22:30开抢';
                }

                return (
                    <View style={styles.container}>
                        <Text style={styles.count_down_label}>
                            {playTimeHint}
                        </Text>
                    </View>
                );
            }
            else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.count_down_label}>
                            开抢倒计时:
                        </Text>
                        <Text style={styles.count_down_time}>
                            {parseInt(this.props.investTime / 60 % 60 / 10)}
                        </Text>
                        <Text style={styles.count_down_time}>
                            {parseInt(this.props.investTime / 60 % 60 % 10)}
                        </Text>
                        <Text style={styles.count_down_time}>
                            :
                        </Text>
                        <Text style={styles.count_down_time}>
                            {parseInt(this.props.investTime % 60 / 10)}
                        </Text>
                        <Text style={styles.count_down_time}>
                            {parseInt(this.props.investTime % 60 % 10)}
                        </Text>
                    </View>
                );
            }
        }
        else {
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9840F',
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    count_down_label: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    count_down_time: {
        backgroundColor: '#FFFFFF',
        fontSize: 15,
        color: '#F9840F',
        marginLeft: 2,
    },
    btn: {
        justifyContent: 'center'
    },
    btnText: {
        color: '#333333'
    }
});