import React,{Component} from 'react'

import {
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native'

export default class TouchableView extends Component {

    render() {
        if (Platform.OS == 'ios') {
            return (
                <TouchableHighlight>
                    {this.props.children}
                </TouchableHighlight>
            )
        } else {
            return (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    {this.props.children}
                </TouchableNativeFeedback>
            )
        }

    }

}