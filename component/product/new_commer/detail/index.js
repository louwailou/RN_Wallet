/**
 * Created by huangYH on 2017/3/8.
 */

"use strict";
import React, {
  Component,
  PropTypes
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  ListView,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';

import NewComerHeader from './header';
import NewComerProductDesc from './description';
import NewComerDate from './date';
import NewComerJoinNumber from './join_number';
import NewComerSafety from './safety';
import NewComerProductDetail from './detail';
import NewComerAgreement from './agreement';
import ErrorPage from '../../../../view/error_page'
import RefreshControl from '../../../../view/refresh/refreshControl'

const _req_url_path = 'v3/product/wukong';
const _req_url_path_is_newcomer = 'v3/member/memberInvestStatus';


const _loadingStateReady = 0;
const _loadingStateOk = 1;
const _loadingStateFail = 2;

export default class ProductNewComerDetail extends Component {

  // 初始化模拟数据
  constructor(props) {
    super(props);
    this._refListView = null;
    this.isRefreshing = false;
    this.pushJoinProduct = true;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }).cloneWithRows([]),
      detailModel: null,
      error: null,
      loadingState: _loadingStateReady,
    };
  }

  _setRefreshState(isRefresh) {
    if (isRefresh && this.state.loadingState != _loadingStateOk) {
      this.startLoading();
    }

    if (!isRefresh) {
      this.stopLoading();
      if (this._refListView) {
        RefreshControl.endRefreshing(this._refListView);
      }
    }
    this.isRefreshing = isRefresh;
  }
  //Component挂载完毕后调用
  componentDidMount() {
    this.fetchData();
  }


  componentDidUpdate() {
    if (this._refListView) {
      RefreshControl.configure({
        node: this._refListView
      }, () => {
        this.fetchData();
      });
    }
  }

  async fetchData() {
    this._setRefreshState(true);
    try {
      let model = await this.fetchPost(_req_url_path, {
        // productType: this.props.productType, 3.0.8 修改不需要传
        productId: this.props.productId
      });

      let data = [];
      let section0 = [];
      let section1 = [];
      let section2 = [];
      let section3 = [];
      let modelFirst = model.quarters[0];
      section0.push(modelFirst.productDesc);
      section0.push(modelFirst.startTime);
      section0.push(modelFirst.joinNumber);
      section1.push(modelFirst.safetyList);
      section2.push(modelFirst.productDetail);
      section3.push(modelFirst.productDetail);
      section3.push(modelFirst.productDetail);
      section3.push(modelFirst.productDetail);
      data.push(section0);
      data.push(section1);
      data.push(section2);
      data.push(section3);

      this._setRefreshState(false)
      this.setState({
        dataSource: new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }).cloneWithRowsAndSections(data),
        detailModel: modelFirst,
        loadingState: _loadingStateOk,

      });

      this.navigator.setTitle({ title: modelFirst.productName })

      if (this.props.showPurchaseView == 1 && this.state.detailModel.status == 101 && this.pushJoinProduct) {
        this.pushJoinProduct = false;
        this.onLineExecute(action => {

          this.fetchNewcomerData();

        })
      }

    } catch (error) {
      this._setRefreshState(false);
      this.setState({
        loadingState: _loadingStateFail,
        error: error.msg
      });
    }
  }


  // 判断是否新手
  async fetchNewcomerData() {
    try {
      let model = await this.fetchPost(_req_url_path_is_newcomer);
      if (model.newUser) {
        this._pushJoinProduct();
      } else {
        this.showDelayInfoTip(model.tip);
      }

    } catch (error) {
      this.showDelayInfoTip(error.msg);
    }
  }




  _renderHeader() {
    return (
      <NewComerHeader detailModel={this.state.detailModel}> </ NewComerHeader>
    );
  }

  _renderFooter() {
    return (
        <Image source={{ uri: this.state.detailModel.serviceDescImg }} style={{ flex: 1, height:77, resizeMode: 'center'}} />
    );
  }

  _pushJoinProduct() {

    this.navigator.showModal('jfwallet://JFJoinProductViewModelProtocol', {
      productId: this.state.detailModel.productId,
      productType: this.props.productType,
      rate: this.state.detailModel.profit,
      days: this.state.detailModel.period,
      miniLimitValue: this.state.detailModel.minInvestAmount,
      remainValue: this.state.detailModel.remainingMoney,
      maxInvestAmount: this.state.detailModel.maxInvestAmount,
      isNewUser: true
    }, true, true);

  }

  render() {

    if (this.state.loadingState == _loadingStateReady) {
      return (
        <View></View>
      );
    } else if (this.state.loadingState == _loadingStateFail) {
      return (
        <ErrorPage msg={this.state.error} tapAction={() => this.fetchData()} />
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#F7F6F8' }}>
        <ListView style={{ flex: 1 }}
          ref={e => this._refListView = e}
          dataSource={this.state.dataSource}
          renderHeader={this._renderHeader.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          enableEmptySections={true}
          renderSectionHeader={(sectionData, sectionID) => {
            if (sectionID == 1) {
              return (
                <TouchableOpacity onPress={() =>
                  this.navigator.pushTo(this.state.detailModel.productSafetyUrl)
                }>
                  <View style={[styles.view, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={{ marginLeft: 20, color: '#000000', fontSize: 16 }}>安全保障</Text>
                    <Image source={require('../../../../assets/image/rightArrow.png')} style={styles.arrow} />
                  </View >
                </TouchableOpacity>
              );
            } else if (sectionID == 2) {
              return (
                <View style={[styles.view, { flexDirection: 'row' }]}>
                  <Text style={styles.title}>产品详情</Text>
                </View>
              );
            } else {
              return (
                <Text style={{ height: 0.1, backgroundColor: '#F7F6F8' }}> </Text>
              );
            }
          }}

          renderRow={(rowData, sectionID, rowID, highlightRow) => {

            if (sectionID == 0) {
              if (rowID == 0) {
                return (<NewComerProductDesc {...this.state.detailModel} />);
              } else if (rowID == 1) {
                return (<NewComerDate detailModel={this.state.detailModel} />);
              } else if (rowID == 2) {
                return (<NewComerJoinNumber detailModel={this.state.detailModel} onPress={() =>
                  this.navigator.pushTo(this.state.detailModel.investRecordUrl)
                } />);
              }
            } else if (sectionID == 1) {
              return (<NewComerSafety detailModel={this.state.detailModel} onPress={() =>
                this.navigator.pushTo(this.state.detailModel.productSafetyUrl)
              } />);
            } else if (sectionID == 2) {
              return (<NewComerProductDetail detailModel={this.state.detailModel} />);
            } else if (sectionID == 3 && rowID == 0) {
              return (<NewComerAgreement model={{
                title: '资金流向',
                subTitle: '借款详情'
              }} onPress={() =>
                this.navigator.pushTo(this.state.detailModel.productLoanUrl)
              } />);
            } else if (sectionID == 3 && rowID == 1) {
              return (<NewComerAgreement model={{
                title: '协议范本',
                subTitle: '查看协议'
              }} onPress={() =>
                this.navigator.pushTo(this.state.detailModel.protocolTemplateUrl)
              } />);
            } else if (sectionID == 3 && rowID == 2) {
              return (<NewComerAgreement model={{
                title: '支持的银行及限额',
                subTitle: '查看详情'
              }} onPress={() =>
                this.navigator.pushTo(this.state.detailModel.supportBankUrl)
              } />);
            }
          }}
        />

        <TouchableOpacity disabled={(this.state.detailModel.status == 102) ? true : false} onPress={() => {
          if (this.state.detailModel.status == 103) {

            Alert.alert('', this.state.detailModel.holdAmountDesc);

          } else {
            this.onLineExecute(action => {

              this.fetchNewcomerData();

            })

          }
        }}>
          <View>
            <Text style={[styles.btn, { backgroundColor: (this.state.detailModel.status == 102) ? '#E6E6E6' : '#F55458' }]}>{this.state.detailModel.statusText}</Text>
          </View>
        </TouchableOpacity>

      </View>

    );

  }

}

const styles = StyleSheet.create({

  remark: {
    fontSize: 10,
    color: '#D2D2D2',
    marginBottom: 10,
    alignSelf: 'center',
  },

  //  100 预售， 101 抢购 ， 102  抢光
  btn: {
    color: '#FFFFFF',
    alignSelf: 'stretch',
    height: 49,
    fontSize: 17,
    textAlign: 'center',
    padding: 16
  },
  text: {
    marginTop: 200,
    backgroundColor: '#FAFAFA',
    color: '#999999',
    alignSelf: 'stretch',
    height: 49,
    fontSize: 12,
    textAlign: 'center',
  },
  arrow: {
    marginRight: 22.5,
    width: 6,
    height: 11

  },
  view: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderColor: '#EBEBEB'
  },
  title: {
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 16,
    color: '#000000',
    fontSize: 16,
    alignSelf: 'center'
  },
});
