import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
} from 'react-native'

import {show} from "../../utils/ToastUtils"

export default class Movie extends Component {

    static navigationOptions = {
        tabBarLabel: "Movie",
        tabBarIcon: (tintColor) => (
            <Image
                style={{
                    width: 26,
                    height: 26,
                    tintColor:{tintColor}
                }}
                source={require('../../data/img/ic_tab_movie.png')}
            />
        )
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>asasa</Text>
            </View>
        )
    }

}