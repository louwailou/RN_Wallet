/**
 * Created by jayden on 2016/12/15.
 */

"use strict";

import React, {Component} from 'react';
import {
    findNodeHandle,
    AppRegistry,
    StyleSheet,
    Platform,
    NativeModules,
    NativeEventEmitter,
    DeviceEventEmitter
} from 'react-native';

const DID_BEGIN_REFRESHING_EVENT = 'startRefresh';

const _callbacks = {};
const _emitter = Platform.OS === 'ios' ? new NativeEventEmitter(NativeModules.JFRefreshEventEmitter) : DeviceEventEmitter;

class RefreshControl {
    constructor(){
        this.subscription = _emitter.addListener(
            DID_BEGIN_REFRESHING_EVENT,
            (body) => {
               let callback = _callbacks[body.reactTag];
               if (callback){
                   callback();
               }
            }
        );
    }

    configure(configs, callback) {
        let nodeHandle = findNodeHandle(configs.node);
        let options = {
            tintColor: configs.tintColor,
            activityIndicatorViewColor: configs.activityIndicatorViewColor
        };

        NativeModules.JFRefreshControl.configure(nodeHandle, options, (error,data) => {
            if (!error) {
                _callbacks[nodeHandle] = callback;
            }
        });
    }

    endRefreshing(node) {
        let nodeHandle = findNodeHandle(node);
        NativeModules.JFRefreshControl.endRefreshing(nodeHandle);
    }
}

module.exports = new RefreshControl();