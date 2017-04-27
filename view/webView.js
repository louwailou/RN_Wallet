/**
 * Created by jayden on 2017/2/1.
 */

"use strict";

import React, { Component, PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

const JFWebView = requireNativeComponent('JFWebView', WebView);

export default class WebView extends Component {
    static propTypes = {
        url: PropTypes.string,
        localFolder: PropTypes.string
    };

    static defaultProps = {
        localFolder: ''
    }

    render() {
        return <JFWebView {...this.props} />;
    }
}