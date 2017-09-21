import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import {MainBg, MainColor,MikeWhiteColor, BaseStyles, WhiteTextColor, GrayWhiteColor,Translucent, BlackTextColor,GrayColor} from './basestyle/BaseStyle'
import ParallaxScrollView from '../widget/ParallaxScrollView'

const Header_Height = 240;

export default class MovieDetail extends Component {

    static navigationOptions = {
        header:null
    }

    _getParallaxLeftView() {
        return (<TouchableOpacity onPress={()=>{
                    this.props.navigation.goBack()
                }}>
                <Image
                    style={{
                        width: 26,
                        height:26,
                    }}
                    source={require('../data/img/icon_back.png')}/>
            </TouchableOpacity>)
    }

    _getParallaxHeaderView() {
        return (
            <View></View>
        )
    }


    render() {
        return (
            <ParallaxScrollView
                windowHeight={Header_Height}
                backgroundSource={{uri: 'http://gaopin-preview.bj.bcebos.com/133108772254.jpg'}}
                navBarTitle="Mung"
                navBarColor={MainColor}
                navBarTitleColor={BlackTextColor}
                leftView={this._getParallaxLeftView()}
                headerView={this._getParallaxHeaderView()}
            >
                <ScrollView style={styles.container}>
                    <View style={{
                        height:1000,
                        backgroundColor:BlackTextColor
                    }}></View>
                </ScrollView>
            </ParallaxScrollView>
        )
    }

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: MainColor
    },
}