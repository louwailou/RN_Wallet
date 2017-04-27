/**
 * Created by jayden on 2017/1/22.
 */

import React, {Component} from 'react';
import {
    NativeModules
} from 'react-native';
import Context from './context';
import ParamsProcessor from './paramsProcessor';

const _rnRoute = 'jfwallet://JFRNViewModelProtocol';
const _nativeNavigator = NativeModules.JFNavigation;

export default class Navigator {

    constructor(instance) {
        this.navItemIds = [];

        this.host = instance;
        this.screenInstanceId = instance.props.instanceId;
    }

    _routeAndParamsHandler(route, params = {}) {
        if (route.startsWith('jfwallet://') || route.startsWith('http')) {
            return {r: route, p: params};
        }

        let defaultRoute = this.host.props.rn_router;
        if (!defaultRoute){
            defaultRoute = _rnRoute;
        }
        let screen = Context.getRegisteredScreenGenerator(route);
        if (screen) {
            let pars = {...params};;
            pars.component = route;
            return {r: defaultRoute, p: pars};
        }
        return {r: null, p: null};
    }

    pushTo(route, params = {}, animated = true, callback = null) {

        let {r,p} = this._routeAndParamsHandler(route,params);

        if (r && p){
            _nativeNavigator.pushTo(r, p, animated,  (error, events) => {
                if (callback && !error) {
                    callback(events[0]);
                }
            });
        }
    }

    pop(animated = true) {
        _nativeNavigator.pop(animated);
    }

    popTo(route, animated = true) {
        _nativeNavigator.popTo(route, animated);
    }

    async canPopTo(route) {
       return _nativeNavigator.canPopTo(route);
    }

    popToRoot(animated = true) {
        _nativeNavigator.popToRoot(animated);
    }

    switchTabIndex(index) {
        _nativeNavigator.switchTabIndex(index);
    }

    resetTo(route, params = {}, animated = false) {
        let {r,p} = this._routeAndParamsHandler(route,params);
        return _nativeNavigator.resetTo(r, p,animated);
    }

    showModal(route, params = {}, animated = true, clearBack = false, callback = null, completion = null) {

        let {r,p} = this._routeAndParamsHandler(route,params);

        if (r && p){
            _nativeNavigator.presentTo(r, p, animated, clearBack, (error, events) => {
                if (callback && !error) {
                    callback(events[0]);
                }
            }, (error, events) => {
                if (completion && !error) {
                    completion();
                }
            });
        }
    }

    dismissModal(animated = true, completion = null) {
        return _nativeNavigator.dismiss(animated,(error,events) => {
            if (completion && !error){
                completion();
            }
        });
    }

    setStatusBar(params = {}) {

    }

    setTitle(params = {}) {
        ParamsProcessor.process(params);
        _nativeNavigator.setNavigationBarTitle(this.screenInstanceId, params);
    }

    setNavigationBarStyle(params = {}) {
        ParamsProcessor.process(params);
        _nativeNavigator.setNavigationBarStyle(this.screenInstanceId, params);
    }

    setButtons(params = {}) {

        let ids = ParamsProcessor.process(params);
        _nativeNavigator.setNavigationBarButtons(this.screenInstanceId, params);

        ids.forEach(item => {
            let callback = Context.getRegisteredAction(item);
            if (!callback) {
                return;
            }

            this.host.addListener(item, (args) => {
                if (callback) {
                    callback(this.host, args.id);
                }
            });
        });

        this.navItemIds.push(ids);
    }

    setTabBar(params = {}) {
        _nativeNavigator.setTabBar(this.screenInstanceId, params);
    }

    setTabBadge(params = {}) {
        _nativeNavigator.navigatorSetTabBadge(this, params);
    }

    cleanup() {
        this.host = undefined;
        this.navItemIds.forEach(item => Context.removeAction(item));
        this.navItemIds = undefined;
    }
}

