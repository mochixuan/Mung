import React,{Component} from 'react'
import {
    View,
    Text,
} from 'react-native'

import {Tabs,Tab,Icon} from 'react-native-elements'
import {show} from "../../utils/ToastUtils"

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 0,
        }
    }

    render() {
        return (
            <Tabs>
                <Tab

                >

                </Tab>
            </Tabs>
        )
    }

}