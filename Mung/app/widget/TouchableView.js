import React,{Component} from 'react'

import {
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native'

export default class TouchableView extends Component {

    static propsTypes = {
        onPress: React.PropTypes.func,
    }


    constructor(props) {
        super(props);
    }

    render() {
        if (Platform.OS == 'ios') {
            return (
                <TouchableOpacity
                    onPress={this.props.onPress}
                >
                    {this.props.children}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableNativeFeedback
                    onPress={this.props.onPress}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    {this.props.children}
                </TouchableNativeFeedback>
            )
        }

    }

}