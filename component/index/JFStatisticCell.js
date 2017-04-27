import React, {
      Component,
      PropTypes
} from 'react';

import { View, Image, StyleSheet, Text, requireNativeComponent} from 'react-native';

// RNAnimatedView 是JFAnimatedCellView 子组件 ,
var RNAnimatedView = requireNativeComponent("JFIndexStatisticsTableViewCell", JFAnimatedCellView);


export default class JFAnimatedCellView extends Component {
static propTypes = {
    /**
    *
    * 定义组件需要传到原生端的属性
    * 使用React.PropTypes来进行校验
    */
    //控制动画的次数
    isRun:PropTypes.bool,

    //赚取总收益
    totalEarning:PropTypes.number,

    //需注册人数
    registerCount:PropTypes.number,


  };

      constructor(props) {
            super(props);

      }
      render() {
            return (
             <RNAnimatedView {...this.props} style = {{flxe:1,height:200}}/>
            );
      }
}