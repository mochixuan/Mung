import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native'
import {MainBg, MainColor, BaseStyles, WhiteTextColor} from '../base/BaseStyle'
import Swiper from 'react-native-swiper'
import {show} from '../../utils/ToastUtils'
import {width} from '../../utils/Utils'
import {App_Name} from '../../data/constant/BaseContant'
import TouchableView from '../widget/TouchableView'

export default class Movie extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={styles.container}>
                {/*状态栏*/}
                <StatusBar
                    animated = {true}
                    backgroundColor = {MainColor}
                    barStyle = 'light-content'
                />
                {/*搜索栏*/}
                <View style={styles.search_view}>
                    <Text style={styles.search_text}>{App_Name}</Text>
                    <TouchableView
                        onPress={()=>{
                            show("搜索")
                        }}
                    >
                        <Image
                            source={require('../../data/img/icon_search.png')}
                            style={[BaseStyles.baseIcon,styles.search_icon]}
                            tintColor={WhiteTextColor}
                        />
                    </TouchableView>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainBg
    },
    search_view: {
        height: 54,
        width:width,
        backgroundColor: MainColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    search_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: WhiteTextColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_icon: {
        marginRight: 20,
        position: 'absolute',
        right: 0,
    }
})