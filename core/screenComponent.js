/*eslint-disable*/

"use strict";

import React, { Component } from 'react';

import {
    NativeEventEmitter,
    DeviceEventEmitter,
    Platform,
    NativeModules
} from 'react-native';

import Navigator from './navigator';
import Context from './context';
import NetFetch from '../service/netFetch'

const _event_login_status = 'loginStatusChanged';
const _event_app_did_background = 'appDidEnterBackground';
const _event_app_will_forground = 'appWillEnterForground';

const _eventEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(NativeModules.JFEventEmitter) : DeviceEventEmitter;

const hudService = NativeModules.JFToastAndLoading;

export default class ScreenComponent extends Component {

    constructor(props) {
        super(props);
        this.contentComponent = null;
        this.navigator = new Navigator(this);

        this.subScribes = {};
        this.subEventIds = [];

        this.addListener = (eventId, callback) => {
            if (this.subEventIds.indexOf(eventId) != -1) {
                this.removeListener(eventId);
            }
            this.subEventIds.push(eventId);
            this.subScribes[eventId] = _eventEmitter.addListener(eventId, callback);
        }

        this.removeListener = (eventId) => {
            let subscription = this.subScribes[eventId]
            subscription && subscription.remove();
            delete this.subScribes[eventId];
            let index = this.subEventIds.indexOf(eventId);
            if (index != -1) {
                delete this.subEventIds[index];
            }
        }

        if (props.itemActionIds) {
            props.itemActionIds.forEach(item => {

                let callback = Context.getRegisteredAction(item);
                if (!callback) {
                    return;
                }

                this.addListener(item, (args) => {
                    if (callback) {
                        callback(this.contentComponent, args.id);
                    }
                });
            });
        }

        this.listenLoginStatus = (subscriber) => this.addListener(_event_login_status, (args) => subscriber && subscriber(...args));
        this.listenAppDidEnterBackground = (subscriber) => this.addListener(_event_app_did_background, (args) => subscriber && subscriber(...args));
        this.listenAppWillEnterForground = (subscriber) => this.addListener(_event_app_will_forground, (args) => subscriber && subscriber(...args));

        this.fetchPost = async (url,params) => await NetFetch.post(url,params);
        this.fetchGet = async (url,params) => await NetFetch.get(url,params);
        this.executeLogin = async () => await Context.executeLogin();
        this.getAccountInfo = async () => await Context.getAccountInfo();
        this.onLineExecute = (action) => Context.onLineExecute(action);
        this.executeCallback = (e = null) => Context.executeCallback(props.instanceId, e);

        this.startLoading = (status = '加载中...') => hudService.showLoadingWithStatus(status);
        this.stopLoading = () => hudService.hideLoading();
        this.showDelayInfoTip = (info = '') => hudService.showDelayInfoTip(info);
    }

    componentWillUnmount() {
        if (this.navigator) {
            this.navigator.cleanup();
            this.navigator = undefined;
        }

        this.subEventIds.forEach(item => this.removeListener(item));

        this.subScribes = undefined;
        this.subEventIds = undefined;

        this.subscribeLoginStatus = undefined;

        this.executeLogin = undefined;
        this.getAccountInfo = undefined;
        this.onLineExecute = undefined;
        this.executeCallback = undefined;

        this.startLoading = undefined;
        this.stopLoading = undefined;
        this.showDelayInfoTip = undefined;
    }
}
