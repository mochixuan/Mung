import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,
} from 'react-native'
import {MainBg, MainColor,MikeWhiteColor, BaseStyles, WhiteTextColor, GrayWhiteColor,Translucent, BlackTextColor,GrayColor} from './basestyle/BaseStyle'
import ParallaxScrollView from '../widget/ParallaxScrollView'

const Header_Height = 240;

export default class MovieDetail extends Component {

    static navigationOptions = {
        header:null
    }

    render() {
        return (
            <ParallaxScrollView
                windowHeight={Header_Height}
                backgroundSource={{uri: 'http://gaopin-preview.bj.bcebos.com/133108772254.jpg'}}
                navBarTitle="Mung"
                navBarColor={MainColor}
                navBarTitleColor={BlackTextColor}
                leftView={
                    <TouchableHighlight
                        onPress={()=>{

                    }}>
                        <Image
                            source={{
                                uri: 'http://gaopin-preview.bj.bcebos.com/133108772254.jpg',
                                width: 26,
                                header:26,
                            }}
                        />
                    </TouchableHighlight>
                }
                rightIcon={
                    <TouchableHighlight onPress={()=>{

                    }}>
                        <Image
                            source={{
                                uri: 'http://gaopin-preview.bj.bcebos.com/133108772254.jpg',
                                width: 26,
                                header:26,
                            }}
                        />
                    </TouchableHighlight>
                }
            >
                <ScrollView >
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