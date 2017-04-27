/**
 * Created by jayden on 2016/11/29.
 */

"use strict";

import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';
export default  class Banner extends Component {

    static propTypes = {
        height:PropTypes.number,
        loop:PropTypes.bool,
        autoPlay:PropTypes.bool,
        renderItems: PropTypes.func
    };

    static defaultProps = {
        height:200,
        loop:true,
        autoPlay:true
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Swiper style={styles.wrapper} height={this.props.height}
                        dot={<View style={styles.dot} />}
                        activeDot={<View style={[styles.dot,styles.activeDot]} />}
                        paginationStyle={styles.page}
                        loop={this.props.loop}
                        autoplay={this.props.autoPlay}>
                    {
                        this.props.renderItems()
                    }
                </Swiper>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    dot: {
        backgroundColor: 'rgba(1,1,1,.4)',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        backgroundColor: '#fff'
    },
    page: {
        bottom: 10,
        alignSelf:'center'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        flex: 1
    }
})

