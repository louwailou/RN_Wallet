/*eslint-disable*/

"use strict";

import React from 'react';
import { AppRegistry } from 'react-native';
import ScreenComponent from './screenComponent';
import _ from 'lodash';
import Context from './context';
import ParamsProcessor from './paramsProcessor';


function registerScreen(screenId, generator) {
    Context.registerScreenGenerator(screenId, generator);
    AppRegistry.registerComponent(screenId, generator);
}

function registerComponent(screenId, generator) {
    const generatorWrapper = () => {

        const InternalComponent = generator();

        return class extends ScreenComponent {

            constructor(props) {
                super(props);

                InternalComponent.prototype.navigator = this.navigator;
                InternalComponent.prototype.executeCallback = this.executeCallback;
                InternalComponent.prototype.listenLoginStatus = this.listenLoginStatus;
                InternalComponent.prototype.listenAppDidEnterBackground = this.listenAppDidEnterBackground;
                InternalComponent.prototype.listenAppWillEnterForground = this.listenAppWillEnterForground;
                InternalComponent.prototype.executeLogin = this.executeLogin;
                InternalComponent.prototype.getAccountInfo = this.getAccountInfo;
                InternalComponent.prototype.onLineExecute = this.onLineExecute;
                InternalComponent.prototype.addListener = this.addListener;
                InternalComponent.prototype.removeListener = this.removeListener;
                InternalComponent.prototype.startLoading = this.startLoading;
                InternalComponent.prototype.stopLoading = this.stopLoading;
                InternalComponent.prototype.showDelayInfoTip = this.showDelayInfoTip;

                InternalComponent.prototype.fetchPost = this.fetchPost;
                InternalComponent.prototype.fetchGet = this.fetchGet;

                this.state = {
                    internalProps: { ...props }
                }
            }


            componentWillReceiveProps(nextProps) {
                this.setState({
                    internalProps: { ...this.props, ...nextProps }
                })
            }

            componentDidMount() {
                let component = this._contentComponent;
            }

            render() {
                return (
                    <InternalComponent ref={e => this.contentComponent = e} {...this.state.internalProps} />
                );
            }
        };


    };



    registerScreen(screenId, generatorWrapper);

    let InternalComponent = generator();
    let navigationBar = _.cloneDeep(InternalComponent.navigationBar || {});
    ParamsProcessor.process(navigationBar);
    let tabBar = _.cloneDeep(InternalComponent.tabBar || {});
    ParamsProcessor.process(tabBar);
    let statusBar = _.cloneDeep(InternalComponent.statusBar || {});
    ParamsProcessor.process(statusBar);

    let barStyle = {
        navigationBar: navigationBar,
        tabBar: tabBar,
        statusBar: statusBar
    }

    Context.registerBarStyle(screenId, barStyle);

    return generatorWrapper;
}

module.exports = registerComponent;
