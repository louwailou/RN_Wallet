"use strict";

import {
    NativeModules
} from 'react-native';

class Context {

    constructor() {
        this.context = NativeModules.JFComponentContext;
        this.registeredScreens = {};
        this.registeredActions = {};
    }

    registerScreenGenerator(screenId, generator) {
        if (!screenId){
            return;
        }
        this.registeredScreens[screenId] = generator;
    }

    getRegisteredScreenGenerator(screenId) {
        const generator = this.registeredScreens[screenId];
        if (!generator) {
            console.error(`Navigation.getRegisteredScreenGenerator: ${screenId} used but not yet registered`);
            return undefined;
        }
        return generator();
    }

    registerAction(actionId, action){
        if (!actionId){
            return;
        }
        this.registeredActions[actionId] = action;
    }

    getRegisteredAction(actionId){
        return  this.registeredActions[actionId]
    }

    removeAction(actionId){
        if (!actionId){
            return;
        }
        delete this.registeredActions[actionId];
    }

    registerBarStyle(screenId = '', barStyle = {}) {
        this.context.registerBarStyle(barStyle, screenId);
    }

    executeCallback(screenInstanceId,obj = {}){
        if (!screenInstanceId){
            return;
        }
        this.context.executeCallback(screenInstanceId,obj);
    }

    async executeLogin(){
        return this.context.executeLogin().catch(error => {});
    }

    async getAccountInfo(){
        return this.context.getAccountInfo().catch(error => {});
    }

    onLineExecute(action){
        if (action) {
            this.context.onLineExecute((error,args) => action(args[0]));
        }
    }
}

module.exports = new Context();
