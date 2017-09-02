import React,{Component} from 'react'
import {
    View,
    Text,
} from 'react-native'

import {Tabs,Tab,Icon} from 'react-native-elements'
import {show} from "../../utils/ToastUtils"
import {MainColor,GrayColor,GrayWhiteColor} from '../base/BaseStyle'
import Movie from '../movie/Movie'

export default class Main extends Component {

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
                    titleStyle={{
                        color: {GrayColor},
                        fontWeight: 'bold',
                        fontSize: 10,
                    }}
                    selectedTitleStyle={{
                        color: {MainColor},
                        fontWeight: 'bold',
                        fontSize: 10,
                    }}
                    selected={
                        this.state.selectedTab==0
                    }
                    title= 'Movie'
                    renderIcon={()=>{
                        return <Icon
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems:'center',
                                marginTop:12
                            }}
                            color= {GrayColor}
                            name={require('../../data/img/ic_tab_movie.png')}
                            size={33}
                        />
                    }}
                    renderSelectedIcon={()=>{
                        return <Icon
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems:'center',
                                marginTop:12
                            }}
                            color= {MainColor}
                            name={require('../../data/img/ic_tab_movie.png')}
                            size={33}
                        />
                    }}
                    onPress={()=>{
                        this.changeTab(0)
                    }}
                >
                    <Movie/>
                </Tab>
            </Tabs>
        )
    }

    changeTab(position) {
        this.setState({
            selectedTab:position
        })
    }

}