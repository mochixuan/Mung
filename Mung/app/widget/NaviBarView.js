import React,{Component} from 'react'
import {
    View,
    Platform
} from 'react-native'

export default class NaviBarView extends Component {

    render() {
        const naviHeight = (Platform.OS === 'ios') ?
            20 : 0
        return (
            <View style={{
                height: naviHeight,
                backgroundColor: '#00000000'
            }}></View>
        )
    }

}