import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TouchableHighlight
} from 'react-native'
import {MainBg, MainColor,MikeWhiteColor, BaseStyles, WhiteTextColor, Translucent, BlackTextColor} from '../base/BaseStyle'
import Swiper from 'react-native-swiper'
import {show} from '../../utils/ToastUtils'
import {width} from '../../utils/Utils'
import {App_Name,Cate_Data} from '../../data/constant/BaseContant'
import TouchableView from '../widget/TouchableView'
import ErrorBean from '../../data/http/ErrorBean'
import HttpMovieManager from '../../data/http/HttpMovieManager'
import StarRating from 'react-native-star-rating'
import LinearGradient from 'react-native-linear-gradient'

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
                    <View
                        key={i}
                        style={styles.swiper_children_view}>
                        <Image
                            style={styles.swiper_children_cover}
                            source={{uri:item.images.large}}/>
                        <View style={styles.swiper_children_right}>
                            <Text style={styles.swiper_children_title}
                                  numberOfLines={1}>
                                {item.title}
                            </Text>
                            <View style={styles.swiper_children_director}>
                                <Image
                                    source={{uri:item.directors[0].avatars.small}}
                                    style={styles.swiper_children_director_img}
                                />
                                <Text style={styles.swiper_children_director_name}
                                    numberOfLines={1}>
                                    {item.directors[0].name}
                                </Text>
                            </View>
                            <View style={styles.swiper_children_casts_view}>
                                <Text
                                    style={styles.swiper_children_casts_text}
                                    numberOfLines={2}>
                                    主演: {item.casts.map((data,i)=>data.name).join(' ')}
                                </Text>
                            </View>
                            <View style={styles.swiper_children_genres_view}
                                  numberOfLines={2}>
                                <Text style={styles.swiper_children_genres_text}>{item.genres.join(" ")}</Text>
                            </View>
                            <View style={styles.swiper_children_rating_view}>
                                <StarRating
                                    disabled={false}
                                    rating={item.rating.average/2}
                                    maxStars={5}
                                    halfStarEnabled={true}
                                    emptyStar={require('../../data/img/icon_unselect.png')}
                                    halfStar={require('../../data/img/icon_half_select.png')}
                                    fullStar={require('../../data/img/icon_selected.png')}
                                    starStyle={{width: 20, height: 20}}
                                    selectedStar={(rating)=>{}}/>
                                <Text style={styles.swiper_children_rating_text}>{item.rating.average}</Text>
                            </View>
                        </View>
                    </View>
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
        return Cate_Data.map((item,i)=>{
            return (
                <TouchableHighlight
                    key={i}
                    style={styles.cate_children_touchview}
                    underlayColor='rgba(100,50,200,0.1)'
                    onPress={()=>show(item.title)}>
                        <LinearGradient
                            onPress={()=>{show(item.title)}}
                            colors={item.colors}
                            style={styles.cate_children_linear}>
                            <Image
                                source={item.icon}
                                style={styles.cate_children_image}/>
                            <Text
                                style={styles.cate_children_text}>
                                {item.title}
                            </Text>
                        </LinearGradient>
                </TouchableHighlight>
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
                        height={220}
                        autoplay={true}
                        autoplayTimeout={4}
                        dot = {<View style={styles.swiper_dot}/>}
                        activeDot = {<View style={styles.swiper_activeDot}/>}
                        paginationStyle={styles.swiper_pagination}>
                        {this.swiperChildrenView()}
                    </Swiper>
                </View>
                {/*分类栏*/}
                <View style={styles.cate_view}>
                    {this.cateChildrenView()}
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
        height: 220,
    },
    swiper_dot: {
        backgroundColor: Translucent,
        width: 16,
        height: 2,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
    },
    swiper_activeDot: {
        backgroundColor: MainColor,
        width: 16,
        height: 2,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
    },
    swiper_pagination: {
        justifyContent: 'flex-end',
        marginRight: 20,
    },
    swiper_children_view: {
        height: 200,
        flexDirection: 'row',
        backgroundColor: MikeWhiteColor,
        alignItems: 'center',
        margin :10,
        paddingLeft:10,
        paddingRight: 10,
        borderRadius: 6,
    },
    swiper_children_cover: {
        width: 112,
        height: 180,
        borderRadius: 4,
    },
    swiper_children_right: {
        marginTop: 20,
        height: 180,
        marginLeft: 20,
    },
    swiper_children_title: {
        fontSize: 18,
        marginBottom: 10,
    },
    swiper_children_director: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    swiper_children_director_img: {
        width: 26,
        height: 26,
        borderRadius: 13,
        marginRight: 8,
    },
    swiper_children_director_name: {
        fontSize: 14,
    },
    swiper_children_casts_view: {
        width: width-190,
        marginBottom: 10,
    },
    swiper_children_casts_text: {
        fontSize:14,
        flexWrap: 'wrap',
    },
    swiper_children_rating_view: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    swiper_children_rating_text: {
        fontSize: 14,
        color: '#ffcc33',
        fontWeight: '500',
        marginLeft: 8,
    },
    swiper_children_genres_view: {
        width: width-190,
        marginBottom: 10,
    },
    swiper_children_genres_text: {
        fontSize:14,
        flexWrap: 'wrap',
    },
    cate_view: {
        height: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft:10,
        marginRight:10,
    },
    cate_children_touchview: {
        width: width/2-20,
        height: 42,
        marginBottom: 8,
        marginLeft: 5,
        marginRight: 5,
    },
    cate_children_linear: {
        width: width/2-20,
        height: 42,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cate_children_image: {
        width: 26,
        height: 26,
        marginRight: 12,
    },
    cate_children_text: {
        fontSize: 18,
        color: WhiteTextColor,
    },
})