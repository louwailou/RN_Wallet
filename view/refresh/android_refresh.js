/**
 * Created by jayden on 2016/12/22.
 */

"use strict";

import { PropTypes } from 'react'
import {
    requireNativeComponent,
    View,
    Platform
} from 'react-native';

if (Platform.OS == 'android') {
    let refresh = {
        name: 'ARefreshView',
        propTypes: {
            ...View.propTypes // 包含默认的View的属性
        },
    };
    module.exports = requireNativeComponent('ARefreshView', refresh);
}