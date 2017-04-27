import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class Orange1030CommentTitle extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>说点啥</Text>
                <Image source={require('../image/orange_tenthirty_comment.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create( {
    container:{
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:14,
        color:'#F99734',
        marginRight:1.5
    },
})