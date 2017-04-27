/**
 * Created by jayden on 2017/1/10.
 */

"use strict";

import {
    processColor,
} from 'react-native';

import resolveAssetSource from 'resolveAssetSource';
import Context from './context';

class ParamsProcessor {

    process(properties) {
        let onPressIds = null;
        for (let property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (property === 'icon' || property.endsWith('Icon') || property.endsWith('Image')) {
                    properties[property] = resolveAssetSource(properties[property]);
                }
                if (property === 'color' || property.endsWith('Color')) {
                    properties[property] = processColor(properties[property]);
                }
                if (property === 'style') {
                    this.process(properties[property]);
                }
                if (property === 'buttons' || property.endsWith('Buttons')) {
                    if (!onPressIds) {
                        onPressIds = [];
                    }
                    let ids = this._processButtons(properties[property]);
                    onPressIds.push(ids);
                }
            }
        }
        return onPressIds;
    }

    processAction(action) {
        let actionId = null;
        if (typeof action === "function") {
            actionId = this._getRandomId();
            let onExecute = action;
            Context.registerAction(actionId, onExecute);
        }
        return actionId;
    }


    _getRandomId() {
        return (Math.random() * 1e20).toString(36);
    }

    _processButtons(buttons) {
        if (!buttons) return;
        let onPressIds = [];
        for (let i = 0; i < buttons.length; i++) {
            buttons[i] = Object.assign({}, buttons[i]);
            let button = buttons[i];
            this.process(button);
            let onPressId = this.processAction(button.onPress);
            if (onPressId) {
                button.onPress = onPressId;
                onPressIds.push(onPressId);
            }
        }
        return onPressIds;
    }
}

module.exports = new ParamsProcessor();