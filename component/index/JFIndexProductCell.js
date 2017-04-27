import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Button } from 'react-native';
export default class JFIndexProductCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
  }

  render() {
    const iconURL = "https://static.9f.cn/pos/img/20170315/1489543044940.png";//self.state.model.tagIconList[0];

    return (
      <TouchableHighlight onPress={this._onPress} style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.container}>
          <View style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent" }}>
            <View style={styles.containerRate}>
              <Text style={styles.rate}>{this.state.model.profit} </Text>
              <Text style={styles.percent}>% </Text>
            </View>
            <View style={{ flex: 1, marginTop: 4, backgroundColor: "transparent" }}>
              <Text style={styles.rateDesc}>预期年化 </Text>
            </View>
          </View>

          <View style={{ flex: 2, flexDirection: "column" }}>

            <View style={{ flexDirection: "row", marginTop: 38, marginLeft: 20, backgroundColor: "transparent", justifyContent: "flex-start", alignItems: "flex-start" }}>
              <Text style={styles.title} > {this.state.model.productName}</Text>
              <Image source={{ uri: iconURL }} style={styles.icon} />
            </View>

            <View style={{ marginTop: 6, backgroundColor: "transparent", marginLeft: 20 }} >
              <Text style={styles.expireTime}> 封闭期{" "}{this.state.model.period}{this.state.model.periodUnit}</Text>
            </View>

          </View>
          <View style={{flexDirection:"row",alignSelf: "center", width: 75, height: 26, marginRight: 20, backgroundColor: '#f53a31'}}>
               <Text style = {{flex:1,color:"#FFFFFF",textAlign:"center" ,fontSize:11,alignSelf:"center"}} onPress= {this._onPressBtn.bind(this)}>立即购买</Text>
          </View>
        </View>
      </TouchableHighlight>

    );
  }

  _onPress() {
    // 跳转到详情页
    console.log("跳转到详情页");
  }
  _onPressBtn() {
    console.log("btn跳转到详情页");
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    height: 106,
  },
  containerRate: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    width: 100,
    marginTop: 30,
    //backgroundColor: "red",
  },
  rate: {
    color: "#f53a31",
    fontSize: 28,
    marginLeft: 0,
    marginTop: 0,
    textAlign: "left",
  },
  percent: {
    marginLeft: -5,
    marginTop: 15,
    color: "#f53a31",
    textAlign: "left",
    fontSize: 15,
  },
  rateDesc: {
    color: "#999999",
    fontSize: 10,
    marginLeft: 20,
    textAlign: 'left',
  },
  title: { // 注意没有flex
    color: "#999999",
    fontSize: 12,
    textAlign: 'left',
  },
  expireTime: {
    color: "#000",
    fontSize: 12,
    textAlign: 'left',
  },
  icon: {// 添加flex 会拉伸哦哦
    width: 22,
    height: 11,
    marginLeft: 2,
  },
  btn: {
    backgroundColor: '#f53a31',

  }
});

// text元素布局和其他的还不一样。在 预期年化 直接使用的话，会出现不正常现象， 必须嵌套到View 中
// flex 代表了布局的填充系数，所以View 的flex 是否设置 关系到其子元素的布局, 如果设置了flex,那摩设置height 就是无效的