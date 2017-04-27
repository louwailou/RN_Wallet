/**
 * Created by jayden on 2016/12/30.
 */



"use strict";

import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import WebView from '../../view/webView';
import Core from '../../core'

export default class ProductDetail extends Component {

    static statusBar = {
        isHidden: false,//是否隐藏
        isHideWithNavBar: false,//是否根据导航栏一块隐藏
        isBlur: false,//是否显示毛玻璃的状态栏
        isLightStyle:false//不设置默认根据导航栏的isBlackBarStyle自动适配，一般不需要设置
    };


    static tabBar = {
        badge:0,
        style:{
            isHidden:false,//是否隐藏
            isDrawUnder:false//是否内容透过tabBar
        }
    };

    static navigationBar = {
        leftButtons: [
            {
                id: 'setting',//唯一标示 用于监听点击事件,可省略
                title: '设置',//标题
                // icon:'',//图标
                onPress:(component,id)=>{
                    component.navigator.pop(true);
                },
                disabled: false,//是否禁用
                enableIconTint: true //是否启用icon的tinColor 默认false 仅IOS(配合icon使用)
            }
        ],
        rightButtons: [
            {
                id: 'message',
                title: '消息',
                onPress: async (component,id)=>{
                    // component.executeCallback({e:1});
                   let userInfo = await component.executeLogin();
                },
                disabled: false,
                enableIconTint: false
            }
        ],
        title: {
            title: '产品详情',//主标题
            subTitle: '',//副标题
            titleType: 'default' // loading 或者 double 默认 default
        },
        style: {
            isBlur: false,//是否添加毛玻璃效果（非系统默认导航栏样式下使用）仅IOS
            isTransparent: false,//是否透明 默认false
            isTranslucent: true, //是否不透明 默认true 仅IOS
            isHiddenBottomBorder: false,//是否隐藏导航栏底线 默认false
            isHidden: false,//是否隐藏 默认false
            isHideOnScroll: false,//是否在滑动时隐藏导航栏 默认false
            isHideWhenVerticallyCompact:false, //滑动时改变导航栏透明度
            isDrawUnder: false,//是否内容透过navBar 默认false
            isDisableBackButton:false,//是否禁用返回按钮 默认false
            isDisablePagePanGesture:false,//是否禁用手势返回 默认false
            isDarkBarStyle:false,//是否使用黑色导航栏风格 默认false
            opacity:1,//不透明度 默认 1
            // backgroundColor: '#000', //导航栏背景色 默认系统风格
            // titleColor: '#ff0',// 标题颜色 默认根据barStyle 分为黑白
            // buttonColor:'#ff0', // 导航栏按钮颜色
        }
    };


    //  static propTypes = {
    //       navigator:PropTypes.instanceOf(Navigator),//导航器
    //       executeCallback:PropTypes.func,//执行上一个页面的回调
    //       listenLoginStatus:PropTypes.func,//监听登陆状态改变
    //       listenAppDidEnterBackground:PropTypes.func,//监听应用进入后台
    //       listenAppWillEnterForground:PropTypes.func,//监听应用进入前台
    //       executeLogin:PropTypes.func,//执行登陆
    //       getAccountInfo:PropTypes.func,//获取当前登陆用户信息
    //       onLineExecute:PropTypes.func,//需登陆才能执行的操作（未登录会弹出登录框，登陆成功后执行）
    //       addListener:PropTypes.func,//监听事件
    //       removeListener:PropTypes.func,//移除监听
    //       startLoading:PropTypes.func,//显示loading
    //       stopLoading:PropTypes.func,//隐藏loading
    //       showDelayInfoTip:PropTypes.func//显示tip提示
    // };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{
                flex:1,
                flexDirection:'column',
            }}>
                <Text>哈哈哈哈哈</Text>
                <WebView url={'https://www.baidu.com'} style={{
                    flex:1
                }}/>
            </View>
        );
    }
}