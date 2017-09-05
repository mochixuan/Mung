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

export default class Movie extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated = {true}
                    backgroundColor = {MainColor}
                    barStyle = 'light-content'
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainBg
    },
})