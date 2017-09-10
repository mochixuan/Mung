import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native'
import {MainBg, MainColor, BaseStyles, WhiteTextColor, Translucent, BlackTextColor} from '../base/BaseStyle'
import Swiper from 'react-native-swiper'
import {show} from '../../utils/ToastUtils'
import {width} from '../../utils/Utils'
import {App_Name} from '../../data/constant/BaseContant'
import TouchableView from '../widget/TouchableView'
import ErrorBean from '../../data/http/ErrorBean'
import HttpMovieManager from '../../data/http/HttpMovieManager'

export default class Movie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotMovies:[],
        }
        this.HttpMovies  = new HttpMovieManager();
        this.requestData();
    }

    requestData() {
        this.HttpMovies.getHottingMovie()
            .then((movies)=>{
                this.setState({
                    hotMovies:movies
                })
            })
            .catch((error)=>{
                if (error != null && error instanceof ErrorBean) {
                    show(error.getErrorMsg())
                } else {
                    show("网络错误")
                }
            })
    }

    swiperChildrenView() {
        let movieDatas = this.state.hotMovies.subjects;
        if (movieDatas != null && movieDatas.length>4) {
            let items=[];
            for (let i=0;i<4;i++) {
                items.push(movieDatas[i]);
            }
            return items.map((item,i)=>{
                return (
                    <Image
                        key={i}
                        source={{uri:item.images.large}}
                        resizeMode='stretch'
                        style={{
                            height: 240,
                            margin:20,
                            width:width,
                            backgroundColor: "#f00",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{
                            color: BlackTextColor,
                        }}>{item.title}</Text>
                    </Image>
                )
            })
        } else {
            return (
                <Image
                    resizeMode='cover'
                    source={require('../../data/img/icon_search.png')}
                    style={{
                        height: 240,
                        width:width,
                        backgroundColor: "#f00",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text>saasa</Text>
                </Image>
            )
        }
    }

    cateChildrenView() {
        const items = ["aa","bb","cc","dd"];
        return items.map((item,i)=>{
            return (
                <TouchableView
                    style={styles.cate_children_view}>
                    <Image
                        source={require('../../data/img/ic_tab_movie.png')}
                        style={styles.cate_children_image}/>
                    <Text
                        style={styles.cate_children_text}>
                        {item}
                    </Text>
                </TouchableView>
            )
        })
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
                    <Text style={styles.search_text}>{App_Name}</Text>
                    <TouchableView
                        onPress={()=>{
                            show("搜索")
                        }}
                    >
                        <Image
                            source={require('../../data/img/icon_search.png')}
                            style={[BaseStyles.baseIcon,styles.search_icon]}
                            tintColor={WhiteTextColor}
                        />
                    </TouchableView>
                </View>
                {/*banner栏*/}
                <View style={styles.swiper}>
                    <Swiper
                        height={240}
                        style={styles.swiper_view}
                        autoplay={true}
                        autoplayTimeout={4}
                        dot = {<View style={styles.swiper_dot}/>}
                        activeDot = {<View style={styles.swiper_activeDot}/>}>
                        {this.swiperChildrenView()}
                    </Swiper>
                </View>
                {/*分类栏*/}
                <View style={styles.cate_view}>

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainBg
    },
    search_view: {
        height: 54,
        width:width,
        backgroundColor: MainColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    search_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: WhiteTextColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_icon: {
        marginRight: 20,
        position: 'absolute',
        right: 0,
    },
    swiper: {
        height: 240,
    },
    swiper_view: {
        height: 240,
    },
    swiper_dot: {
        backgroundColor: Translucent,
        width: 20,
        height: 3,
        borderRadius: 1,
        marginLeft: 4,
        marginRight: 4,
    },
    swiper_activeDot: {
        backgroundColor: MainColor,
        width: 20,
        height: 3,
        borderRadius: 1,
        marginLeft: 4,
        marginRight: 4,
    },
    cate_view: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cate_children_view: {
        width: width/3,
        height: 80,
        backgroundColor: '#ff23d3',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cate_children_image: {
        width: 26,
        height: 26,
        marginLeft: 20,
        tintColor:WhiteTextColor,
    },
    cate_children_text: {
        fontSize: 18,
        color: WhiteTextColor,
    },
})