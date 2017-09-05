import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native'

import {TabOptions} from '../../utils/Utils'

export default class Movie extends Component {

    static navigationOptions = TabOptions('Movie',require('../../data/img/ic_tab_movie.png'))

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <StatusBar
                    animated = {true}
                    backgroundColor = 'blue'
                    barStyle = 'light-content'
                />
                <Text>asasa</Text>
            </View>
        )
    }

}