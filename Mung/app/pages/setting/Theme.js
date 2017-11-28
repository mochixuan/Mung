import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    StatusBar,
    Animated,
    Easing,
    Platform,
} from 'react-native'
import NaviBarView from '../../widget/NaviBarView'
import {Theme_Datas} from '../../data/constant/BaseContant'
import {width, height,} from '../../utils/Utils'
import {
    MainBg, GrayBlackColor, BaseStyles, WhiteTextColor, GrayWhiteColor, Translucent, BlackTextColor,
    GrayColor, White, MikeWhiteColor
} from '../basestyle/BaseStyle'
import {insertThemeColor, queryThemeColor} from '../../data/realm/RealmManager'

const itemHight = 200;

export default class Theme extends Component {

    static navigationOptions = {
        header: null
    }

    _getItemLayout(data, index) {
        return {length: itemHight,offset: itemHight*index,index}
    }

    constructor(props) {
        super(props);
        this.state= {
            MainColor: queryThemeColor()
        }
        this.fadeAnim = new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(
            this.fadeAnim,
            {
                toValue: 1.0,
                easing:Easing.ease,
                delay:400,
                useNativeDriver:true,  //不加会卡住在最后一点
            }
        ).start()
    }

    _renderItemView(item){
        return (
            <TouchableOpacity onPress={()=>{
                insertThemeColor(item.color)
                this.props.navigation.state.params.data();
                this.props.navigation.goBack()
            }}>
                <Animated.View style={{
                    flex:1,
                    opacity:this.fadeAnim,
                    transform:[
                        {
                            scale:this.fadeAnim
                        }
                        ]
                }}>
                    <View style={styles.item}>
                        <View style={[styles.item_top,{backgroundColor:item.color}]}/>
                        <View style={styles.item_bottom}>
                            <Text numberOfLines={1} style={[styles.item_bottom_text,{color:item.color}]}>{item.name}</Text>
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar
                    animated = {true}
                    backgroundColor = {this.state.MainColor}
                    barStyle = 'light-content'
                />
                <NaviBarView backgroundColor={this.state.MainColor}/>
                {/*toolbar*/}
                <View style={[styles.toolbar,{backgroundColor:this.state.MainColor}]}>
                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.goBack()}}>
                        <Image
                            source={require('../../data/img/icon_back.png')}
                            style={styles.toolbar_left_img}
                            tintColor={White}/>
                    </TouchableOpacity>
                    <View style={styles.toolbar_middle}>
                        <Text style={styles.toolbar_middle_text}>Theme</Text>
                    </View>
                    <View style={styles.toolbar_right_img}/>
                </View>
                <View style={styles.flat_view}>
                    <FlatList
                        data = {Theme_Datas}
                        keyExtractor={(item,index)=>index}
                        renderItem={
                            ({item}) => this._renderItemView(item)
                        }
                        getItemLayout={(data,index)=> this._getItemLayout(data,index)}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}/>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:MainBg,
    },
    flat_view: {
        flex:1,
        padding:5,
    },
    toolbar: {
        height:56,
        width:width,
        alignItems: 'center',
        flexDirection: 'row',
    },
    toolbar_left_img:{
        width:26,
        height:26,
        alignSelf: 'center',
        marginLeft: 20,
    },
    toolbar_middle: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolbar_middle_text: {
        fontSize: 18,
        fontWeight: '600',
        color:White
    },
    toolbar_right_img: {
        width:26,
        height:26,
        alignSelf: 'center',
        marginRight: 20,
    },
    item: {
        width:(width-40)/3,
        height:(width-40)*0.4,
        margin:5,
    },
    item_top: {
        width:(width-40)/3,
        flex:2,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
    },
    item_bottom: {
        width:(width-40)/3,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        backgroundColor:White,
    },
    item_bottom_text: {
        fontSize:14,
        fontWeight:'500',
        color:GrayBlackColor,
    }
})