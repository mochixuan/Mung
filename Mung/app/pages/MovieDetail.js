import React,{Component} from 'react'
import {
    View,
    Text,
} from 'react-native'

import {MainBg, MainColor,MikeWhiteColor, BaseStyles, WhiteTextColor, GrayWhiteColor,Translucent, BlackTextColor,GrayColor} from './basestyle/BaseStyle'

export default class MovieDetail extends Component {

    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: MainColor
    },
}