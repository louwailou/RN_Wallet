import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import Orange1030Header from './header'
import Orange1030Product from './product'
import Orange1030Buy from './buy'
import Orange1030Recommend from './recommend'
import Orange1030CommentTitle from './commentTitle'
import Orange1030Comment from './comment'
import NetFetch from '../../../../service/netFetch';
import RefreshControl from '../../../../view/refresh/refreshControl'

const _req_url_path = 'v3/activity/orange1030';
const _req_url_comment_path = 'v3/activity/orange1030/comments'

const _loadingStateReady = 0;
const _loadingStateOk = 1;
const _loadingStateFail = 2;

var pageNo = 1;
var commentArray = new Array();
var interval = null;

export default class Orange1030Detail extends Component {

  constructor(props) {
    super(props);
    this._refListView = null;
    this.state = {
      detailModel: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([]),
      loadingState: _loadingStateReady,
      investTime: 0,
    };
  }

  _setRefreshState(isRefresh) {
    if (isRefresh && this.state.loadingState != _loadingStateOk) {
      this.props.startLoading();
    }

    if (!isRefresh) {
      this.props.stopLoading();
      if (this._refListView) {
        RefreshControl.endRefreshing(this._refListView);
      }
    }
    this.isRefreshing = isRefresh;
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnMount() {
    this.interval = null;
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
      let model = await NetFetch.post(_req_url_path, {
      });

      let commentTmpList = await NetFetch.post(_req_url_comment_path, {
        pageNo: 1,
        pageCount: 10
      });

      if (pageNo == 1) {
        commentArray[0] = -1;
        commentArray = commentArray.concat(commentTmpList.commentList);
      }
      pageNo = 2;

      if (model.currentServerTime < model.startTime) {
        model.investTime = (model.startTime - model.currentServerTime) / 1000;
      }
      else {
        model.investTime = 0;
      }

      if (model.endTime > model.currentServerTime && model.endTime != 0) {
        model.endTimeInvest = (model.endTime - model.currentServerTime) / 1000;
      }
      else {
        model.endTimeInvest = 0;
      }

      this._setRefreshState(false);
      clearInterval(interval);

      this.setState({
        detailModel: model,
        investTime: model.investTime,
        endTimeInvest: model.endTimeInvest,
        loadingState: _loadingStateOk,
        alertOrange: model.alert,
        commentArray: commentArray
      });

      if (model.investTime == 0 && model.remainingMoney == 0 && model.recommendProduct) {
        this.setState({
          dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          }).cloneWithRowsAndSections({ 0: [model, model, model], 1: commentArray }),
        });
      }
      else {
        this.setState({
          dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          }).cloneWithRowsAndSections({ 0: [model, model], 1: commentArray }),
        });
      }

      if ((this.state.investTime > 0) || this.state.endTimeInvest > 0) {
        interval = setInterval(() => {
          var investTime = this.state.investTime - 1;
          var endTimeInvest = this.state.endTimeInvest - 1;
          this.setState({
            investTime: investTime,
            endTimeInvest: endTimeInvest
          });

          if (investTime == 1) {
            this.fetchData();
          }

          if (endTimeInvest == 0 && this.state.detailModel.endTime != 0) {
            this.fetchData();
          }

          if (investTime == 0 && endTimeInvest == 0) {
            clearInterval(interval);
          }
        }, 1000);
      }

    } catch (error) {
      this._setRefreshState(false);
    }
  }

  _renderHeader() {
    return (
      <Orange1030Header investTime={this.state.investTime} playTime={this.state.detailModel.playTime}></Orange1030Header>
    );
  }

  goToDetail() {
    this.props.navigator.pushTo(this.state.detailModel.detailGo);
  }

  goToBuy() {

  }

  render() {

    if (this.state.loadingState == _loadingStateOk) {

      return (

        <View style={{ flex: 1 }}>
          <ListView style={{ flex: 1 }}
            ref={e => this._refListView = e}
            dataSource={this.state.dataSource}
            renderHeader={this._renderHeader.bind(this)}
            enableEmptySections={true}
            renderSectionHeader={(sectionData, sectionID) => {
              if (sectionID == 1) {
                return (
                  <View style={styles.riskView}>
                    <Text style={styles.riskTitle}>*预期收益非平台承诺收益，市场有风险，投资需谨慎</Text>
                  </View>
                )
              }
              return (<Text></Text>);
            }}
            renderRow={(rowData, sectionID, rowID, highlightRow) => {

              if (sectionID == 0) {
                if (rowID == 0) {
                  return (<Orange1030Product model={this.state.detailModel} onChildHanlder={this.goToDetail.bind(this)}></Orange1030Product>);
                }
                else if (rowID == 1) {
                  return (<Orange1030Buy model={this.state.detailModel} investTime={this.state.investTime} alert={this.state.alertOrange} onChildHanlder={this.goToBuy.bind(this)}></Orange1030Buy>);
                }
                else {
                  return (<Orange1030Recommend model={this.state.detailModel}></Orange1030Recommend>);
                }
              }
              else if (sectionID == 1) {
                if (rowID == 0) {
                  return (<Orange1030CommentTitle></Orange1030CommentTitle>);
                }
                else {
                  return (<Orange1030Comment model={this.state.commentArray[rowID]}></Orange1030Comment>);
                }
              }
              return (<View></View>);
            }}
          />
        </View >
      );
    }
    else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  riskView: {
    height: 24,
    backgroundColor: '#F7F6F8',
    marginRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  riskTitle: {
    color: '#B4B4B4',
    fontSize: 11,
  }
});