import React, {
      Component,
      PropTypes
} from 'react';

import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';


export default class JFIndexTenColck extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  item: props.item,
                  timeStamp: 0,
            };
            console.log(props.item);
      }

      render() {

            let url = this.state.item.img;
            let timeState = 0;
            let timeTextColor = "#b4b4b4";
            if (timeState == 0) {//  倒计时

            } else if (timeState == 1) {

            } else {

            }
            return (
                  <TouchableOpacity style={{ flex: 1 }} onPress= {this._pushController}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                              <View >
                                    <Text style={{ fontSize: 14, color: "#f53a31", marginLeft: 15, marginTop: 25 }}>{this.state.item.text1}
                                          <Text style={{ fontSize: 14, color: "#000", marginLeft: 5 }}> {this.state.item.text2}</Text>
                                    </Text>
                                    <View style={{ flexDirection: "row", }}>
                                          <Text style={{ fontSize: 12, color: "#999999", marginLeft: 15, marginTop: 3 }}> {this.state.item.text3}</Text>
                                          <Text style={{ fontSize: 9, textAlign: "center", marginLeft: 2, marginTop: 1, alignSelf: "center", borderWidth: 1, borderColor: timeTextColor, color: timeTextColor }}>{" "}抢光了{" "}</Text>
                                    </View>
                              </View>
                              <Image source={{ uri: url }} style={{ marginTop: 28, width: 25, height: 25 }} />
                              <View style={{ backgroundColor: "#f7f6f8", width: 1, right: 0 }} />
                        </View>
                  </TouchableOpacity>
            );
      }


      _pushController(item) {
            console.log(item);
      }
}