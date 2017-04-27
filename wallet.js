
import React, {
  Component
} from 'react';

import {
  View
} from 'react-native'
import Goby from "react-native-goby"
import Core from './core';
import ProductNewComerDetail from './component/product/new_commer/detail';
import Orange1030Detail from './component/product/orange_1030/detail'

import JFIndexVC from './component/index/Index';

class Home extends Component{
    render(){
        return (
            <View></View>
        );
    }
}

(() => {
    Core.RegisterComponent('com.9fbank.home',() => Goby({
            updateDialog: false,
            checkFrequency: Goby.CheckFrequency.ON_APP_RESUME,
            installMode: Goby.InstallMode.IMMEDIATE
        })(Home));
   Core.RegisterComponent('com.9fbank.productNewComerDetail', () => ProductNewComerDetail);

   Core.RegisterComponent('com.9fbank.IndexVC',() => JFIndexVC);

   Core.RegisterComponent('com.9fbank.orange1030Detail',() => Orange1030Detail);

})()

