import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

export default  class ErrorPage extends Component {

    static propTypes = {
        msg:PropTypes.string,
        tapAction: PropTypes.func
    };

    static defaultProps = {
        msg:'',
        tapAction:null
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
               <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:'center'}} onPress={this.props.tapAction} >
                <Image source={require('../assets/image/no_network.png')}/>
                <Text style={{fontSize:14, marginVertical:8}}>{this.props.msg}</Text>
                <Text style={{fontSize:12,color:'#4093FF'}}>点击重试</Text>
               </TouchableOpacity>
            </View>
        )
    }
}

