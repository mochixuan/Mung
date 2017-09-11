import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native'
import {MainBg, MainColor,MikeWhiteColor, BaseStyles, WhiteTextColor, Translucent, BlackTextColor} from '../base/BaseStyle'
import Swiper from 'react-native-swiper'
import {show} from '../../utils/ToastUtils'
import {width} from '../../utils/Utils'
import {App_Name} from '../../data/constant/BaseContant'
import TouchableView from '../widget/TouchableView'
import ErrorBean from '../../data/http/ErrorBean'
import HttpMovieManager from '../../data/http/HttpMovieManager'
import StarRating from 'react-native-star-rating'

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
                        autoplay={true}
                        autoplayTimeout={4}
                        dot = {<View style={styles.swiper_dot}/>}
                        activeDot = {<View style={styles.swiper_activeDot}/>}>
                        {this.swiperChildrenView()}
                    </Swiper>
                </View>
                {/*分类栏*/}
                <View style={styles.cate_view}>
                    <Text>分类蓝</Text>
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
    swiper_children_view: {
        height: 220,
        flexDirection: 'row',
        backgroundColor: MikeWhiteColor,
        alignItems: 'center',
        margin :10,
        paddingLeft:10,
        paddingRight: 10,
        borderRadius: 6,
    },
    swiper_children_cover: {
        width: 128,
        height: 200,
        borderRadius: 4,
    },
    swiper_children_right: {
        marginTop: 20,
        height: 200,
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