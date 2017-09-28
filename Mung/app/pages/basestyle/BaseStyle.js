import {StyleSheet} from 'react-native'
import {queryThemeColor} from '../../data/realm/RealmManager'

//const MainColor = '#937eff'

const GrayColor = '#9D9D9D'
const GrayBlackColor = '#666666'
const White = '#ffffff'
const Translucent = 'rgba(125,125,125,0.6)'
const MainBg = '#f5f5f5'
const GrayWhiteColor = '#f5f5f5'
const MikeWhiteColor = '#f0ffff'
const BlackTextColor = '#444444'
const BlackColor = '#000000'
const WhiteTextColor = '#ffffff'

const BaseStyles = StyleSheet.create({
    baseWhiteText: {
        fontSize: 16,
        color: WhiteTextColor,
    },
    baseBlackText: {
        fontSize: 16,
        color: BlackTextColor,
    },
    baseIcon: {
        width:26,
        height: 26,
    }
})

export {
    MainBg,
    GrayColor,
    GrayBlackColor,
    Translucent,
    White,
    BlackColor,
    GrayWhiteColor,
    MikeWhiteColor,
    BlackTextColor,
    WhiteTextColor,
    BaseStyles,
}