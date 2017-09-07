import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native'
import {MainBg,MainColor} from '../base/BaseStyle'
import Swiper from 'react-native-swiper'
import {show} from '../../utils/ToastUtils'

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
        backgroundColor: MainColor,
    }
})