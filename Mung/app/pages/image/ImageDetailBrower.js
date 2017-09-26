import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Easing,
} from 'react-native';
import Swiper from 'react-native-swiper'
import {width,height} from '../../utils/Utils'
import {
    MainBg, MainColor, GrayBlackColor, BaseStyles, WhiteTextColor, GrayWhiteColor,
    Translucent, BlackTextColor, GrayColor, White, BlackColor } from '../basestyle/BaseStyle'
import {show} from "../../utils/ToastUtils";
import HttpMovieManager from '../../data/http/HttpMovieManager'
import LinearGradient from 'react-native-linear-gradient'
import ErrorBean from '../../data/http/ErrorBean'

export default class ImageDetailBrower extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props);
        this.state={
            paginationIndex: this.props.navigation.state.params.data.index,
            isInitSuccess:true,
            imageDatas:[],
        }
        this.isStartAnim = false;
        this.fadeAnim = new Animated.Value(0)
        this.HttpImages  = new HttpMovieManager();
        this.requestPhotos();
    }

    requestPhotos() {
        this.HttpImages.getPhotoDatas(this.props.navigation.state.params.data.id,
            this.props.navigation.state.params.data.count)
            .then((data)=>{
                this.isStartAnim = true;
                this.setState({imageDatas:data.photos})
            }).catch((error)=>{
                if (error != null && error instanceof ErrorBean) {
                    show(error.getErrorMsg())
                } else {
                    show("网络错误")
                }
            this.setState({isInitSuccess:false})
        })
    }

    _renderSwiperItemView(){
        return this.state.imageDatas.map((item,i)=>{
            return (
                <View
                    key={i}
                    style={styles.swiper_bigimg_view}>
                    <Animated.Image
                        source={{uri:item.image}}
                        onLoad={()=>{
                            if (this.isStartAnim) {
                                this.isStartAnim = false;
                                this.fadeAnim.setValue(0)
                                Animated.timing(
                                    this.fadeAnim,
                                    {
                                        toValue: 1.0,
                                        easing:Easing.linear
                                    }
                                ).start()
                            }
                        }}
                        style={[styles.swiper_bigimg_image,{
                            opacity:this.fadeAnim,
                            transform:[{
                                scale:this.fadeAnim.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [0.2,1],
                                })
                            }]
                        }]}/>
                </View>
            )
        })
    }

    render() {
        if (this.state.imageDatas.length==0) {
            return (
                this.state.isInitSuccess?(
                    <LinearGradient style={styles.loading_view} colors={[MainColor,WhiteTextColor]}>
                        <ActivityIndicator
                            animating={true}
                            color={MainColor}
                            size='large'/>
                        <Text style={styles.loading_text}>loading</Text>
                    </LinearGradient>
                ):(
                    <LinearGradient style={styles.loading_view} colors={[MainColor,WhiteTextColor]}>
                        <TouchableOpacity onPress={()=>{
                            this.setState({isInitSuccess:true})
                            this.requestPhotos()}}>
                            <Text style={styles.reload_view}>reloading</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )

            )
        }else {
            return (
                <LinearGradient style={styles.container} colors={[MainColor,WhiteTextColor]}>
                    {/*状态栏*/}
                    <StatusBar
                        animated = {true}
                        backgroundColor = {MainColor}
                        barStyle = 'light-content'/>
                    {/*状态栏*/}
                    <View style={styles.toolbar_view}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.goBack()}}>
                            <Image
                                style={styles.toolbar_view_img}
                                source={require('../../data/img/icon_back.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.toolbar_view_text}>{this.state.paginationIndex+1}/{this.state.imageDatas.length}</Text>
                    </View>
                    {/*大图浏览*/}
                    <View style={styles.swiper_view}>
                        <Swiper
                            loop={false}
                            showsPagination={false}
                            index={this.props.navigation.state.params.data.index}
                            onIndexChanged={(index)=>{
                                this.setState({
                                    paginationIndex:index
                                })
                            }}>
                            {this._renderSwiperItemView()}
                        </Swiper>
                    </View>
                </LinearGradient>
            )
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    loading_view: {
        flex:1,
        width:width,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: MainBg,
    },
    loading_text: {
        fontSize:18,
        fontWeight: '500',
        marginTop:6,
        color: MainColor,
    },
    reload_view: {
        padding:8,
        textAlign: 'center',
        color: MainColor,
        fontSize:20,
        fontWeight: '500',
        borderColor:MainColor,
        borderWidth:3,
        borderRadius:6,
    },
    toolbar_view: {
        height:56,
        width:width,
        position: 'absolute',
        zIndex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbar_view_img: {
        width:26,
        height:26,
        marginLeft:16,
    },
    toolbar_view_text: {
        color: WhiteTextColor,
        fontSize:16,
        fontWeight: '500',
        marginLeft:16,
    },
    swiper_view: {
        flex:1,
        width:width,
    },
    swiper_bigimg_view: {
        justifyContent:'center',
        alignItems: 'center',
        width:width,
        flex:1,
    },
    swiper_bigimg_image: {
        width:width,
        flex:1,
        resizeMode: 'contain',
    },
})