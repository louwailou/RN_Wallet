import React, {
  Component,
  PropTypes
} from 'react';

import { View, Image, SectionList, StyleSheet, Text, TouchableWithoutFeedback, ScrollView, } from 'react-native';

import NetFetch from '../../service/netFetch';
import { ScreenWidth, ScreenHeight } from "./JFConst";
import JFIndexProductCell from './JFIndexProductCell';
import JFRecommendZone from './JFRecommendZone';
import JFIndexBanner from "./JFIndexBanner";
import JFIndexStatisticCell from './JFStatisticCell';

const index_url = "v303/template/home";




export default class JFIndexVC extends Component {
  /*
 static defaultProps = {        autoPlay: false,
     maxLoops: 10,    };
      // 注意这里有分号
    static propTypes = {        autoPlay: React.PropTypes.bool.isRequired,
            maxLoops: React.PropTypes.number.isRequired,
               posterFrameSrc: React.PropTypes.string.isRequired,
                    videoSrc: React.PropTypes.string.isRequired,    };  // 注意这里有分号


  */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      recommend: [],
      bannerList: [],
    }

  }
  // 定义实例变量

  // 这个是一个实例变量
  _renderFooter = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#f7f6f8", height: 70 }}>
        <Text style={{ color: "#d2d2d2", fontSize: 10, textAlign: "center", top: 20 }}>
          玖富集团旗下平台 京ICP证070133号  京ICP备07003840号-1
        </Text>
        <Text style={{ color: "#d2d2d2", fontSize: 10, textAlign: "center", top: 25 }}>*预期收益非平台承诺收益,市场有风险,投资需谨慎</Text>
      </View>
    );
  };


  async  requestData() {
    try {
      let model = await NetFetch.post(index_url);
      this.combineData(model);
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  combineData(model) {
    let recommendZone = model.productList;//推荐4个板块
    let investProductList = model.investProduct.productList;
    let investPersonAmount = model.investProduct.investAmount;// 投资人数
    let registerPersonAmount = 0;
    // 注册人数
    let totalEarning = 0;
    if (model.statistical) {
      registerPersonAmount = model.statistical.regNumber;
      totalEarning = model.statistical.totalEarnings; // 赚取收益
    }
    let financialList = model.financialList;// 特色理财
    let zoneList = model.zoneList;// 专区
    let bannerList = model.bannerList;
    let infoList = model.infoList;// 我的财富成长 info
    //拼接数据
    // 先以多个section 处理


    var datas = [];
    //布局zone

    let renderZoneItem = (list) => {
      let arr = [];
      let baseX = 0;
      list.forEach((item, index) => {
        let imgURL = item.img;
        baseX = 5;//+= (141 + 10) * index; // marginLeft 计算偏移量  不是ios 的计算方式了
        //width: 141, height: 83
        arr.push(
          <View style={{ justifyContent: "center", alignItems: "center", marginLeft: baseX, }} key={"zoneItem" + index} >
            <TouchableWithoutFeedback
              onPress={(e) => { console.log("点击zone item"); }}>
              <Image source={{ uri: imgURL }} style={styles.zoneItem} />
            </TouchableWithoutFeedback>
          </View>
        );
      });
      return arr;
    };

    const renderZone = ({ item, index }) => {
      let list = item.zone;
      let arr = renderZoneItem(list);

      return (// 还必须使用VIew wapped 不然 显示不出来 fuck!!!!
        <View style={styles.zoneContainer}>
          <ScrollView
            contentContainerStyle={{ justifyContent: "space-between", flexDirection: "row", alignItems: 'center' }}
            key="zone"
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            bounces={true}
            contentInset={{ top: 0, left: 5, bottom: 0, right: 5 }}
            contentOffset={{ x: 0, y: 0 }}
          >
            {arr}
          </ScrollView>
        </View>
      );

    }
    datas.push({ data: [{ zone: zoneList }], key: "zoneScrollView", renderItem: renderZone });

    // info
    let sectionNum = 1;
    const renderInfo = ({ item, index }) => {
      const img = item.img;
      return (
        <View key={index + "info"}>
          <Image style={styles.infoContainer} source={{ uri: img }} />
        </View>);

    };
    if (infoList.length > 0) {
      infoList.forEach((item, index) => { datas.push({ data: [item], key: "info" + index, renderItem: renderInfo }); })
    }
    // 特色理财
    const renderTeLiCai = ({ item, index }) => {
      const img = item.img;
      return (
        <View key={index + "tese"} >
          <Image style={styles.teSeContaoner} source={{ uri: img }} />
        </View>);
    }
    if (financialList.length > 0) {
      financialList.forEach((item, index) => {
        datas.push({ data: [item], key: "financial" + index, renderItem: renderTeLiCai });

      })
    }

    // 产品
    datas.push({
      data: [{
        "name": "大家都在投",
        "personCount": investPersonAmount
      }].concat(investProductList),
      key: "product", renderItem: this._renderProduct
    });// 妹的 每一个section 的key 必须是一样的，
    // 使用函数的方式赋值 ，直接设置对象{} 会因为object.assign({},{a:1},{a:2})

    const renderStatistic = ({item}) => {
       return <JFIndexStatisticCell isRun={true}  registerCount= {item.registerCount} totalEarning = {item.totalEarning} key = "statisticInfo" style = {{flex:1,height:150}}/>
    }
    // statistic 统计
    datas.push({
      data: [{
        "registerCount": registerPersonAmount,
        "totalEarning": totalEarning
      }],
      key: "statisticInfo", renderItem: renderStatistic
    });


    this.setState({
      recommend: recommendZone,
      isLoading: false,
      dataList: datas,
      bannerList: bannerList,
    });

  }
  _renderProduct({ item, index }) {
    if (item.name) {
      return (
        <View style={styles.cellHeader} key="headerCell">
          <Text style={{ flex: 1, marginLeft: 20, fontSize: 12, backgroundColor: "transparent" }}> {item.name} </Text>
          <Text style={{ flex: 1, fontSize: 12, marginRight: 10, backgroundColor: "transparent", textAlign: "right" }}> {item.personCount} </Text>
        </View>
      );
    } else {
      return (
        <JFIndexProductCell model={item} key={index + "product"} />
      );
    }
  }
  // 渲染
  render() {
    if (!this.state.dataList) {
      return <View />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <SectionList style={{ flex: 1, backgroundColor: 'white' }}
          // renderItem={this._renderProduct}//也可以让每一个section 自己定义
          sections={this.state.dataList}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={this._renderFooter}
          ListHeaderComponent={this._renderHeader.bind(this, this.state.recommend)}
          SectionSeparatorComponent={this._sectionSeparatorComponent}
          //shouldItemUpdate={this._shouldItemUpdate}
          keyExtractor={this._uniqueKey}
        />
      </View>
    );
  }

  _uniqueKey(item, index) {
    if (item.buriedPoint && item.buriedPoint.id) {
      return item.buriedPoint.id;
    }
    return "other" + index;
  }
  // _shouldItemUpdate(prevProps, nextProps) {
  //   if (prevProps.item !== nextProps.item) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  _sectionSeparatorComponent() {
    return (
      <View style={{ backgroundColor: '#f7f6f8', height: 10 }} />
    );
  }

  _renderHeader(items) {
    if (items.length < 1) {

      return <View ><Text>空白格</Text></View>
    }
    return (
      <View style={{ flex: 1, flexDirection: "column", height: 410, backgroundColor: "#f6f7f8" }}>
        <JFIndexBanner bannerList={this.state.bannerList} />
        <JFRecommendZone item={items} />
      </View>

    );
  }

  _renderSeparator() {

    return (
      <View style={{ backgroundColor: '#f7f6f8', height: 2 }} />
    );
  }

  // life cycle
  componentWillMount() {
    this.requestData();

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

}

const styles = StyleSheet.create({
  tableHeader: {
    flex: 1,
    height: 403,
    backgroundColor: "#f7f6f8",
  },
  tableFooter: {
    flex: 1,
    height: 60,
    backgroundColor: 'red',
  },
  recommendContainer: {// 推荐专区
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 8,
    //marginRight:10,
    backgroundColor: 'white',
    height: 190,
  },
  recommendItem: {
    flex: 1,
    height: 90,
  },
  zoneContainer: {
    flex: 1,
    height: 83,
    //marginLeft: 8,
    backgroundColor: "#f7f6f8",
  },
  zoneItem: {
    width: 141,
    height: 83,
  },
  infoContainer: {
    flex: 1,
    height: 89,
    justifyContent: 'center',
    //width:ScreenWidht,
  },
  teSeContaoner: {
    flex: 1,
    height: 155,
    justifyContent: 'center',
  },
  cellHeader: {
    flex: 1,
    alignItems: "center",
    height: 35,
    flexDirection: 'row',
    backgroundColor: "transparent",
  },
  cell: {
    flex: 1,
    height: 106,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#5890ff',
    height: 1,
  },
});