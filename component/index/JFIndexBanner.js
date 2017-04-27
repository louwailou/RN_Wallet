"use strict"

import React, { Component, PropTypes } from 'react';
import { View, TouchableWithoutFeedback, ScrollView, Animated, StyleSheet, Image } from 'react-native';
import Dimentions from 'Dimensions';
import ViewPager from "react-native-viewpager";
let screenWidth = Dimentions.get('window').width;

export default class JFIndexBanner extends Component {
  static propTypes = {
    bannerList: React.PropTypes.array.isRequired
  };
  static defaultProps = {
    bannerList: []
  };

  constructor(props) {
    super(props)
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state = {
      bannerList: dataSource.cloneWithPages(props.bannerList),
    }
    this._count = props.bannerList.length;
    this._index = 0;
  }

  render() {
    return (
      <ViewPager style={styles.container} dataSource={this.state.bannerList}
        renderPage={this._renderPage}
        isLoop={true}
        autoPlay={true}
        initialPage={0}
        renderPageIndicator={this._renderPageIndicator.bind(this)}
        onChangePage={this._onChangePage.bind(this)}
      />
    );
  }

  _onChangePage(index) {
    this._index = index;

  }
  //
  _renderPageIndicator() {

    let width = 8 * this._count;
    let offsetX = 8 * this._index;
    // this._index 总是慢一拍

    let left = (screenWidth - width) / 2;
    return (
      <View style={{ width: width, height: 6, marginLeft: 0, backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: 8, flexDirection: "row", bottom: 25, alignSelf: "center" }} >
        <View style={{ width: 8, height: 6, borderRadius: 2, backgroundColor: "#FFFFFF", marginLeft: offsetX }}></View>
      </View>)
      ;
  }

  _renderPage(itemModel, pageID) {

    return (<TouchableWithoutFeedback onPress={(e) => {
      // ******* this is null ******

      console.log(itemModel);
    }} key={pageID}>
      <Image source={{ uri: itemModel.img }} style={styles.imageItem} />
    </TouchableWithoutFeedback>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    height: 230,
  },
  imageItem: {
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: screenWidth,
    height: 230,
  },
  dotNormal: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginHorizontal: 5
  }
})

/*
bannerList": [{
			"buriedPoint": {
				"id": "320000103",
				"label": "",
				"params": {
					"pageTitle": "banner",
					"URLPageUrl": "http://welicaim.9fbank.com/h5/act/project/app/3.0/insurance/index.html"
				}
			},
			"go": "https://m.wosai.cn/ads/ofo?qrCodeId=16032400053019979542&merchantId=c79fe332-b300-11e5-9987-6c92bf21cf9b&type=1&uuid=80189d19-a01e-4a36-bbfb-07638adc449e&order_sn=7895259948355689&from=singlemessage&isappinstalled=0",
			"img": "https://static.9f.cn/pos/img/20161108/1478598894124.png"
		},
    */