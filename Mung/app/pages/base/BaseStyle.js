import {StyleSheet} from 'react-native'

const MainColor = '#0fe238'
const GrayColor = '#666666'
const White = '#ffffff'
const MainBg = '#ffffff'
const GrayWhiteColor = '#f5f5f5'
const MikeWhiteColor = '#e0e0e0'
const BlackTextColor = '#444444'
const WhiteTextColor = '#ffffff'

const BaseStyles = StyleSheet.create({
    baseWhiteText: {
        fontSize: 16,
        color: WhiteTextColor,
    },
    baseBlackText: {
        fontSize: 16,
        color: BlackTextColor,
    }
})

export {
    MainColor,
    GrayColor,
    White,
    GrayWhiteColor,
    MikeWhiteColor,
    BlackTextColor,
    WhiteTextColor,
    BaseStyles,
}