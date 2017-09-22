import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import {
    MainBg, MainColor, GrayBlackColor, BaseStyles, WhiteTextColor, GrayWhiteColor, Translucent, BlackTextColor,
    GrayColor, White
} from './basestyle/BaseStyle'
import {width,height} from '../utils/Utils'
import ErrorBean from '../data/http/ErrorBean'
import {ParallaxScrollView,DEFAULT_NAVBAR_HEIGHT} from '../widget/ParallaxScrollView'
import MoreTextView from '../widget/MoreTextView'
import LinearGradient from 'react-native-linear-gradient'
import StarRating from 'react-native-star-rating'
import {show} from "../utils/ToastUtils";
import HttpMovieManager from '../data/http/HttpMovieManager'

const Header_Height = (height-DEFAULT_NAVBAR_HEIGHT)/2;

export default class MovieDetail extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props);
        this.state= {
            rating: 0,
            movieData: null,
            isInitSuccess: true,
        }
        this.HttpMovies  = new HttpMovieManager();
        this.requestData()
    }

    requestData() {
        this.HttpMovies.getMovieDetail(this.props.navigation.state.params.data)
            .then((data)=>{
                this.setState({movieData:data})
            }).catch((error)=>{
                if (error != null && error instanceof ErrorBean) {
                    show(error.getErrorMsg())
                } else {
                    show("网络错误")
                }
                this.setState({isInitSuccess:false})
        })
    }

    _getParallaxLeftView() {
        return (<TouchableOpacity onPress={()=>{
                    this.props.navigation.goBack()
                }}>
                <Image
                    style={BaseStyles.baseIcon}
                    source={require('../data/img/icon_back.png')}/>
            </TouchableOpacity>)
    }

    _getParallaxHeaderView() {
        return (
            <LinearGradient
                colors={[MainColor,WhiteTextColor]}
                style={styles.header_view}>
                <View style={styles.header_image_view}>
                    <Image
                        style={styles.header_image}
                        source={{uri:this.state.movieData.images.large}}
                    />
                </View>
            </LinearGradient>
        )
    }

    getRatingComment() {
        const number = this.state.movieData.ratings_count;
        if (number ==0) {
            return "暂无评论"
        }else {
            return number+"人";
        }
    }

    render() {

        if (this.state.movieData==null) {
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
                            this.requestData()}}>
                            <Text style={styles.reload_view}>reloading</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )

            )
        } else {
            return (
                <ParallaxScrollView
                    windowHeight={Header_Height}
                    navBarTitle={this.state.movieData.title}
                    navBarColor={MainColor}
                    navBarTitleColor={WhiteTextColor}
                    leftView={this._getParallaxLeftView()}
                    headerView={this._getParallaxHeaderView()}>
                    <ScrollView style={styles.container}>
                        {/*评分等介绍*/}
                        <View style={styles.intro}>
                            <View style={styles.intro_one}>
                                <View style={styles.intro_one_left}>
                                    <Text style={styles.intro_one_left_top_title} numberOfLines={1}>{this.state.movieData.title}</Text>

                                    <Text style={styles.intro_one_left_bottom_text} numberOfLines={1}>{this.state.movieData.year}/{this.state.movieData.genres.join('/')}</Text>
                                    <Text style={styles.intro_one_left_bottom_text} numberOfLines={1}>原名: {this.state.movieData.original_title}</Text>
                                    <Text style={styles.intro_one_left_bottom_text} numberOfLines={1}>导演: {this.state.movieData.directors[0].name}</Text>
                                    <Text style={styles.intro_one_left_bottom_text} numberOfLines={1}>主演: {this.state.movieData.casts.map((data,i)=>data.name).join(' ')}</Text>
                                </View>
                                <View style={styles.intro_one_right}>
                                    <Text style={styles.intro_one_right_title} numberOfLines={1}>综合评分</Text>
                                    <Text style={styles.intro_one_right_score} numberOfLines={1}>{this.state.movieData.rating.average}</Text>
                                    <StarRating
                                        disabled={false}
                                        rating={this.state.movieData.rating.average/2}
                                        maxStars={5}
                                        halfStarEnabled={true}
                                        emptyStar={require('../data/img/icon_unselect.png')}
                                        halfStar={require('../data/img/icon_half_select.png')}
                                        fullStar={require('../data/img/icon_selected.png')}
                                        starStyle={{width: 12, height: 12}}
                                        selectedStar={(rating)=>{}}/>
                                    <Text style={styles.intro_one_right_number} numberOfLines={1}>{this.getRatingComment()}</Text>
                                </View>
                            </View>
                            <View style={styles.intro_two}>
                                <Text style={styles.intro_two_left} numberOfLines={1}>我来评分</Text>
                                <StarRating
                                    disabled={false}
                                    rating={this.state.rating}
                                    maxStars={5}
                                    halfStarEnabled={false}
                                    emptyStar={require('../data/img/icon_unselect.png')}
                                    halfStar={require('../data/img/icon_half_select.png')}
                                    fullStar={require('../data/img/icon_selected.png')}
                                    starStyle={{width: 20, height: 20}}
                                    selectedStar={(rating)=>{
                                        this.setState({
                                            rating:rating,
                                        })
                                    }}/>
                            </View>
                        </View>
                        {/*简介*/}
                        <View style={styles.brief_view}>
                            <Text style={styles.brief_view_text}>简介</Text>
                            <MoreTextView
                                numberOfLines={3}
                                hideText='缩小'
                                showText='展开'
                                textStyle={{
                                    color: GrayColor,
                                    fontSize:14,
                                    marginTop:4,
                                }}>
                                <Text style={styles.brief_view_intro}>{this.state.movieData.summary}</Text>
                            </MoreTextView>
                        </View>
                    </ScrollView>
                </ParallaxScrollView>
            )
        }
    }

}

const styles = {
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
    container: {
        flex: 1,
        backgroundColor: MainBg,
    },
    header_view: {
        width:width,
        height:Header_Height,
        backgroundColor:MainColor,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header_image_view: {
        width: (Header_Height-DEFAULT_NAVBAR_HEIGHT)*0.64,
        height: (Header_Height-DEFAULT_NAVBAR_HEIGHT),
        borderRadius:8,
        marginBottom: DEFAULT_NAVBAR_HEIGHT/3,
        elevation:8,
        shadowRadius:8,
    },
    header_image: {
        width: (Header_Height-DEFAULT_NAVBAR_HEIGHT)*0.64,
        height: (Header_Height-DEFAULT_NAVBAR_HEIGHT),
        borderRadius:8,
    },
    intro: {
        padding:16,
        height: 200,
        width:width,
        borderBottomWidth:1,
        borderBottomColor: WhiteTextColor,
    },
    intro_one: {
        flex:5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    intro_one_left: {
        flex:1,
        paddingRight:36,
    },
    intro_one_left_top_title: {
        fontSize: 20,
        color: GrayBlackColor,
        fontWeight:'500',
        marginBottom:14,
    },
    intro_one_left_bottom_text: {
        fontSize:13,
        color:GrayColor,
    },
    intro_one_right: {
        width:100,
        height:100,
        elevation:8,
        shadowRadius:8,
        backgroundColor: White,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intro_one_right_title: {
        fontSize:12,
        color:GrayColor,
    },
    intro_one_right_score: {
        fontSize: 20,
        color: GrayBlackColor,
        fontWeight:'500',
    },
    intro_one_right_number: {
        fontSize:12,
        color:GrayColor,
    },
    intro_two: {
        flex:2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffcc33',
        marginLeft:10,
        marginRight:10,
        marginTop:20,
        borderWidth:1,
        borderRadius:4,
    },
    intro_two_left: {
        fontSize:16,
        color: '#ffcc33',
        fontWeight:'500',
        marginRight:10,
    },
    brief_view: {
        padding:16,
    },
    brief_view_text: {
        fontSize:14,
        color:GrayColor,
        marginBottom:10,
    },
    brief_view_intro: {
        fontSize:14,
        color:GrayBlackColor,
        lineHeight:24,
    },
}