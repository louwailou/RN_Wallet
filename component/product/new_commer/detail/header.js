"use strict";
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Numeral from 'numeral';

export default class NewConmerHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <View style={Styles.redView}>
        <Text style={Styles.rate}>{Numeral(this.props.detailModel.profit).format('0.00')}<Text style={{ fontWeight: 'normal', fontSize: 26 }}>%</Text></Text>
        <Text style={Styles.rateText}>预期年化收益率</Text>
        <Text style={Styles.decs}>{this.props.detailModel.newUserProductDesc}</Text>
        <Text style={Styles.remainingInvestment}>剩余可投(元):<Text>{Numeral(this.props.detailModel.remainingMoney).format('0,0.00')}</Text></Text>

        <View style={{backgroundColor: '#EB474B', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: 70 }}>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[Styles.detail ,{marginBottom:5}]}>{this.props.detailModel.period}<Text style={{fontSize:18}}>{this.props.detailModel.periodUnit}</Text></Text>
            <Text style={[Styles.detail, { fontSize: 12, opacity: 0.8 }]}>封闭期</Text>
          </View>
          <View style={{ height: 36, width: 0.5, backgroundColor: '#FFFFFF', alignSelf: 'center', opacity: 0.2, }}></View>


          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[Styles.detail,{marginBottom:5}]}>{this.props.detailModel.minInvestAmount}</Text>
            <Text style={[Styles.detail, { fontSize: 12, opacity: 0.8 }]}>起投金额(元)</Text>
          </View>

        </View>

      </View>

    );
  }
}


const Styles = StyleSheet.create({
  rate: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: '500',
    paddingVertical: 5,
  },
  rateText: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    height: 20,
    marginBottom: 12,
  },
  decs: {
    alignSelf: 'center',
    marginBottom:12.5,
    color: '#FFFFFF',
    height: 21,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    opacity: 0.8,

  },
  remainingInvestment: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom:10
  },
  detail: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
  },
  line: {
    marginTop: 17.5,
    marginBottom: 16.5,
    width: 0.5,
    height: 36,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
  redView: {
    backgroundColor: '#F55458',
    height: 240,
    justifyContent:'flex-end'
  },
});
