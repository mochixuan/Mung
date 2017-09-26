import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    StatusBar,
    TextInput,
} from 'react-native'
import {width, height, jumpPager} from '../../utils/Utils'
import ErrorBean from '../../data/http/ErrorBean'
import LinearGradient from 'react-native-linear-gradient'
import {show} from "../../utils/ToastUtils";
import HttpMovieManager from '../../data/http/HttpMovieManager'
import TouchableView from '../../widget/TouchableView'
import {Movie_Types} from '../../data/constant/BaseContant'
import {
    MainBg, MainColor, GrayBlackColor, BaseStyles, WhiteTextColor, GrayWhiteColor, Translucent, BlackTextColor,
    GrayColor, White
} from '../basestyle/BaseStyle'

export default class Search extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props) {
        super(props)
        this.state = {
            editValue: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*状态栏*/}
                <StatusBar
                    animated = {true}
                    backgroundColor = {MainColor}
                    barStyle = 'light-content'
                />
                {/*搜索栏*/}
                <View style={styles.search_view}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.goBack()}}>
                        <Image
                            style={styles.search_view_back}
                            source={require('../../data/img/icon_back.png')}/>
                    </TouchableOpacity>
                    <TextInput
                        placeholder="search"
                        placeholderTextColor={GrayColor}
                        onChangeText={(text)=>this.setState({editValue:text})}
                        value={this.state.editValue}
                        underlineColorAndroid='transparent'
                        style={styles.search_view_edit}
                    />
                    <TouchableOpacity onPress={()=>{
                        if (this.state.editValue==null && this.state.editValue.length==0) {
                            show("请输入想搜索内容")
                        } else {
                            jumpPager(this.props.navigation.navigate,'SearchDetail')
                        }}}>
                        <Image
                            style={styles.search_view_icon}
                            source={require('../../data/img/icon_search.png')}/>
                    </TouchableOpacity>
                </View>
                {/*推荐栏*/}
                <View style={styles.recommend_view}>
                    {this.renderRecommendView()}
                </View>
            </View>
        )
    }

    renderRecommendView() {
        return Movie_Types.map((item,i)=>{
            return (
                <TouchableView key={i}
                    onPress={()=>{
                        this.setState({editValue:item.type})
                    }}>
                    <View
                        style={styles.recommend_view_item}>
                        <View style={[styles.recommend_view_item_icon_view,{borderColor:item.color}]}>
                            <Image source={item.icon}
                                   style={[styles.recommend_view_item_icon,{tintColor:item.color}]}/>
                        </View>
                        <Text style={[styles.recommend_view_item_text,{color:item.color}]}>{item.type}</Text>
                    </View>
                </TouchableView>

            )
        })
    }

}


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    search_view: {
        height:56,
        width:width,
        backgroundColor:MainColor,
        alignItems: 'center',
        flexDirection: 'row',
    },
    search_view_back: {
        width:26,
        height:26,
        marginLeft:20,
    },
    search_view_edit: {
        flex:1,
        margin:8,
        marginLeft:20,
        marginRight:20,
        padding:4,
        paddingLeft:8,
        backgroundColor:White,
        borderRadius:30,
        borderWidth:1,
        borderColor:GrayColor,
    },
    search_view_icon: {
        width:26,
        height:26,
        marginRight:20,
    },
    recommend_view: {
        marginTop:40,
        padding:16,
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent:'center'
    },
    recommend_view_item: {
        flexDirection: 'row',
        alignItems:'center',
        padding:20,
        paddingTop:16,
    },
    recommend_view_item_icon_view: {
        padding:4,
        borderWidth:2,
        borderRadius:30,
        marginRight:10,
        justifyContent:'center',
        alignItems: 'center',
    },
    recommend_view_item_icon: {
        width:26,
        height:26,
    },
    recommend_view_item_text: {
        fontSize:16,
    }
})