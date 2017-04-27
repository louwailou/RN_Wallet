import React, {
  Component,
  PropTypes
} from 'react';

import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import JFIndexTenColck from './JFIndexTenClock';

export default class JFRecommendZone extends Component {
  constructor(props) {
    super(props);
    var list = props.item;
    let viewList = [];
    list.forEach((item, index) => {
      if (index == 2) {
        viewList.push(this._tenClock(item, index));
      } else {
        viewList.push(this._universalItem(item, index));
      }
    });
    this.state = { data: viewList };

  }

  render() {
    //{this.state.data.slice(0, 2)}
    return (
      <View style={{ backgroundColor: "white", height: 180, flexDirection: "column", marginHorizontal: 8, bottom: 10, shadowColor: "black", shadowOffset: { width: 2, height: 6 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
        <View style={{ height: 90, flexDirection: "row" }}>{this.state.data.slice(0, 2)}</View>
        <View style={{ height: 90, flexDirection: "row" }}>{this.state.data.slice(2)}</View>
      </View>
    );
  }
  _tenClock(item, index) {

    return <JFIndexTenColck item={item}  key = {"recommend_clock"}/>
  }
  _universalItem(item, index) {
    let url = item.img;
    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: "column" }} key= {"recommend" + index} onPress={this._pushController.bind(this, item)}>
        <View style={{ flex: 1, flexDirection: "row", }}>
          <View style = {{flex:2,}}>
            <Text style={{ fontSize: 14, color: "#f53a31", marginLeft: 15, marginTop: 25 }}>
              {item.text1}
              <Text style={{ fontSize: 14, color: "#000", left: 10, }}>
                {"  " + item.text2}
              </Text>
            </Text>
            <Text style={{ fontSize: 12, color: "#999999", marginLeft: 15, marginTop: 3 }}> {item.text3}</Text>
          </View>
          <Image source={{ uri: url }} style={{ marginRight:20,  marginTop: 28, width: 25, height: 25 }} />
          <View style={{ backgroundColor: "#f7f6f8", width: 1, right: 0 }} />
        </View>
        <View style={{ backgroundColor: "#f7f6f8", height: 1, bottom: 0 }} />
      </TouchableOpacity>
    );
  }

  _pushController(item) {
    console.log(item);
  }

}