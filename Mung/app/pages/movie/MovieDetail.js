import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    FlatList,
    StatusBar,
    Platform,
} from 'react-native'
import {
    MainBg, GrayBlackColor, BaseStyles, WhiteTextColor, GrayWhiteColor, Translucent, BlackTextColor,
    GrayColor, White
} from '../basestyle/BaseStyle'
import {width, height, jumpPager} from '../../utils/Utils'
import ErrorBean from '../../data/http/ErrorBean'
import {ParallaxScrollView,DEFAULT_NAVBAR_HEIGHT} from '../../widget/ParallaxScrollView'
import LinearGradient from 'react-native-linear-gradient'
import StarRating from 'react-native-star-rating'
import {show} from "../../utils/ToastUtils";
import {Default_Photos} from '../../data/constant/BaseContant'
import HttpMovieManager from '../../data/http/HttpMovieManager'

import {queryThemeColor} from '../../data/realm/RealmManager'

const Header_Height = (height-DEFAULT_NAVBAR_HEIGHT)/2;
const InitPhoto_Count = 6;

export default class MovieDetail extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props);
        this.state= {
            rating: 0,
            movieData: null,
            photoDatas:Default_Photos,
            commentaryDatas:{},
            isInitSuccess: true,
            IsLoadingComment: true,
            isShowAll:false,
            MainColor:queryThemeColor()
        }
        this.HttpMovies  = new HttpMovieManager();
        this.requestData()
        this.requestPhotos(InitPhoto_Count)
        this.requestCommonary();
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

    requestPhotos(count) {
        this.HttpMovies.getPhotoDatas(this.props.navigation.state.params.data,count)
            .then((data)=>{
                this.setState({photoDatas:data})
            }).catch((error)=>{
                if (error != null && error instanceof ErrorBean) {
                    show(error.getErrorMsg())
                } else {
                    show("网络错误")
                }
            })
    }

    requestCommonary() {
        let start = 0
        if (this.state.commentaryDatas.start != null) {
            start = this.state.commentaryDatas.start+1;
            if (this.state.commentaryDatas.start*this.state.commentaryDatas.count>=this.state.commentaryDatas.total) {
                show("没有更多评论");
                this.setState({
                    IsLoadingComment: false,
                })
                return;
            }
        }
        this.HttpMovies.getCommenaryData(this.props.navigation.state.params.data,start,20)
            .then((data)=>{
                let newDatas = data;
                if (this.state.commentaryDatas.comments!=null) {
                    newDatas.comments = [...this.state.commentaryDatas.comments,...data.comments];
                }
                this.setState({
                    commentaryDatas:newDatas,
                    IsLoadingComment: false,
                })
            }).catch((error)=>{
                if (error != null && error instanceof ErrorBean) {
                    show(error.getErrorMsg())
                } else {
                    show("网络错误")
                }
                this.setState({
                    IsLoadingComment: false,
                })
            })
    }

    _getParallaxLeftView() {
        return (<TouchableOpacity onPress={()=>{
                    this.props.navigation.goBack()
                }}>
                <Image
                    style={BaseStyles.baseIcon}
                    source={require('../../data/img/icon_back.png')}/>
            </TouchableOpacity>)
    }

    _getParallaxHeaderView() {
        return (
            <LinearGradient
                colors={[this.state.MainColor,WhiteTextColor]}
                style={[styles.header_view,{backgroundColor:this.state.MainColor}]}>
                <View style={styles.header_image_view}>
                    <Image
                        style={styles.header_image}
                        source={{uri:this.state.movieData.images.large}}
                    />
                </View>
            </LinearGradient>
        )
    }

    _getFileMakerItemView(item) {
        return (
            <View style={styles.filemiker_View}>
                <Image
                    source={{uri:item.avatars.large}}
                    style={styles.filemiker_view_image}/>
                <Text style={styles.filemiker_view_name} numberOfLines={1}>{item.name}</Text>
            </View>
        )
    }

    _getPhotosItemView(item,index) {
        if (this.state.photoDatas.w_badge != null) {
            return (
                <TouchableOpacity
                    underlayColor='rgba(100,51,200,0.1)'
                    onPress={()=>{this.requestPhotos(InitPhoto_Count)}}>
                    <View style={styles.photos_loading}>
                        <Text style={[styles.photos_item_reloadtext,{color: this.state.MainColor}]}>重新加载剧照</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            if (index == this.state.photoDatas.photos.length-1) {
                return (
                    <TouchableOpacity
                        underlayColor='rgba(100,51,200,0.8)'
                        onPress={()=>{this.jumpImageBrowerPager(0)}}>
                        <View style={styles.photos_loading}>
                            <Text style={styles.photos_item_text}>全部剧照</Text>
                            <View style={styles.photos_item_mask}/>
                            <Text style={styles.photos_item_text}>{item.photos_count}张</Text>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity
                        underlayColor='rgba(100,51,200,0.1)'
                        onPress={()=>{this.jumpImageBrowerPager(index)}}>
                            <Image
                                source={{uri:item.image}}
                                style={styles.photos_item_image}/>
                    </TouchableOpacity>
                )
            }
        }
    }

    jumpImageBrowerPager(index) {
        jumpPager(this.props.navigation.navigate,'ImageDetailBrower',{
            id:this.props.navigation.state.params.data,
            index:index,
            count:this.state.photoDatas.photos[0].photos_count,
        })
    }

    _getCommentaryItemView(item) {
        return (
            <View style={styles.commentary_item_view}>
                <Image
                    source={{uri:item.author.avatar}}
                    style={[styles.commentary_item_auther_img,{borderColor:this.state.MainColor}]}
                />
                <View>
                    <View style={styles.commentary_item_view_top}>
                        <View style={styles.commentary_item_view_top_left}>
                            <Text style={styles.commentary_item_view_top_name} numberOfLines={1}>
                                {item.author.name}
                            </Text>
                            <StarRating
                                disabled={false}
                                rating={item.rating.value}
                                maxStars={5}
                                halfStarEnabled={true}
                                emptyStar={require('../../data/img/icon_unselect.png')}
                                halfStar={require('../../data/img/icon_half_select.png')}
                                fullStar={require('../../data/img/icon_selected.png')}
                                starStyle={{width: 10, height: 10}}
                                selectedStar={(rating)=>{}}/>
                        </View>
                        <View style={styles.commentary_item_view_top_right}>
                            <Image
                                source={require('../../data/img/icon_zan.png')}
                                style={styles.commentary_item_view_top_right_img}
                                tintColor={this.state.MainColor}
                            />
                            <Text style={styles.commentary_item_view_top_right_num}>{item.useful_count}</Text>
                        </View>
                    </View>
                    <View style={styles.commentary_item_view_mid}>
                        <Text
                            numberOfLines={6}
                            style={styles.commentary_item_view_comment}
                        >{item.content}</Text>
                        <Text style={styles.commentary_item_view_time} numberOfLines={1}>{item.created_at}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _getCommentaryItemLoadView() {
        if (this.state.IsLoadingComment) {
            return (
                <TouchableOpacity onPress={()=>{show("加载中,请稍等")}}>
                    <View style={{flexDirection:'row'}}>
                        <ActivityIndicator
                            style={{marginRight:6}}
                            animating={true}
                            color={this.state.MainColor}/>
                        <Text style={[styles.commentary_item_loadmore_text,{color:this.state.MainColor}]}>加载中</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={()=>{
                    if (this.state.IsLoadingComment) {
                        show('已加载中,请稍等')
                    } else {
                        this.setState({
                            IsLoadingComment: true,
                        })
                        this.requestCommonary()
                    }}}>
                    <Text style={[styles.commentary_item_loadmore_text,{color:this.state.MainColor}]}>加载更多评论</Text>
                </TouchableOpacity>
            )
        }
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
                    <LinearGradient style={styles.loading_view} colors={[this.state.MainColor,WhiteTextColor]}>
                        <ActivityIndicator
                            animating={true}
                            color={this.state.MainColor}
                            size='large'/>
                        <Text style={[styles.loading_text,{color: this.state.MainColor}]}>loading</Text>
                    </LinearGradient>
                ):(
                    <LinearGradient style={styles.loading_view} colors={[this.state.MainColor,WhiteTextColor]}>
                        <TouchableOpacity onPress={()=>{
                            this.setState({isInitSuccess:true})
                            this.requestData()}}>
                            <Text style={[styles.reload_view,{color: this.state.MainColor, borderColor:this.state.MainColor,}]}>reloading</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )

            )
        } else {
            return (
                <ParallaxScrollView
                    windowHeight={Header_Height}
                    navBarTitle={this.state.movieData.title}
                    navBarColor={this.state.MainColor}
                    navBarTitleColor={WhiteTextColor}
                    leftView={this._getParallaxLeftView()}
                    rightView={<View/>}
                    headerView={this._getParallaxHeaderView()}>
                    {/*状态栏*/}
                    <StatusBar
                        animated = {true}
                        backgroundColor = {this.state.MainColor}
                        barStyle = 'light-content'
                    />
                    <ScrollView style={styles.container}>
                        {/*评分等介绍*/}
                        <View style={styles.intro}>
                            <View style={styles.intro_one}>
                                <View style={styles.intro_one_left}>
                                    <Text style={styles.intro_one_left_top_title} numberOfLines={1}>{this.state.movieData.title}</Text>

                                    <Text style={styles.intro_one_left_bottom_text} numberOfLines={1}>{this.state.movieData.year}/{this.state.movieData.genres.join('/')}</Text>
                                    <Text style={styles.intro_one_left_bottom_text} numberOfLines={1}>原名: {this.state.movieData.original_title}</Text>
                                    <Text style={styles.intro_one_left_bottom_text} numberOfLines={1}>导演: {(this.state.movieData.directors[0]!=null?this.state.movieData.directors[0].name:"未知")}</Text>
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
                                        emptyStar={require('../../data/img/icon_unselect.png')}
                                        halfStar={require('../../data/img/icon_half_select.png')}
                                        fullStar={require('../../data/img/icon_selected.png')}
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
                                    emptyStar={require('../../data/img/icon_unselect.png')}
                                    halfStar={require('../../data/img/icon_half_select.png')}
                                    fullStar={require('../../data/img/icon_selected.png')}
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
                            <Text style={styles.brief_view_intro} numberOfLines={this.state.isShowAll?99:4}>
                                {this.state.movieData.summary}
                            </Text>
                            {this.state.isShowAll==false?<View style={styles.brief_view_expand}>
                                    <Text
                                        onPress={()=>{this.setState({isShowAll:true})}}
                                          style={[styles.brief_view_expand_text,{color:this.state.MainColor}]}>展开</Text>
                            </View>:null}
                        </View>
                        {/*影人*/}
                        <View style={styles.filemaker}>
                            <Text style={styles.filemaker_text}>影人</Text>
                            <FlatList
                                data={this.state.movieData.casts}
                                keyExtractor={(item, index) => index}
                                renderItem={({item})=>(this._getFileMakerItemView(item))}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        {/*剧照*/}
                        <View style={styles.photos}>
                            <Text style={styles.photos_text}>剧照</Text>
                            <FlatList
                                data={this.state.photoDatas.photos}
                                keyExtractor={(item, index) => index}
                                renderItem={({item,index})=>(this._getPhotosItemView(item,index))}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        {/*评论*/}
                        <View style={styles.commentary}>
                            <View style={styles.commentary_descr_view}>
                                <Text style={styles.commentary_descr_text}>评论区</Text>
                            </View>
                            <View style={styles.commentary_flatlist_view}>
                                <FlatList
                                    data={this.state.commentaryDatas.comments}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({item})=>(this._getCommentaryItemView(item))}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        </View>
                        {/*加载更多*/}
                        <View style={styles.commentary_item_loadmore_view}>{this._getCommentaryItemLoadView()}</View>
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
        backgroundColor: 'transparent',
    },
    reload_view: {
        padding:8,
        textAlign: 'center',
        fontSize:20,
        fontWeight: '500',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header_image_view: {
        width: (Header_Height-DEFAULT_NAVBAR_HEIGHT)*0.64,
        height: (Header_Height-DEFAULT_NAVBAR_HEIGHT),
        borderRadius:4,
        marginBottom: DEFAULT_NAVBAR_HEIGHT/3,
        elevation:8,
        shadowRadius:8,
    },
    header_image: {
        width: (Header_Height-DEFAULT_NAVBAR_HEIGHT)*0.64,
        height: (Header_Height-DEFAULT_NAVBAR_HEIGHT),
        borderRadius:4,
    },
    intro: {
        padding:16,
        height: 200,
        width:width,
        borderBottomWidth:1,
        borderBottomColor: White,
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
        elevation:6,
        shadowRadius:6,
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
    brief_view_expand: {
        position:'absolute',
        bottom:16,
        right:16,
    },
    brief_view_expand_text:{
        fontSize:14,
        lineHeight:24,
        paddingLeft:10,
        backgroundColor:MainBg
    },
    filemaker: {
        height: 216,
        flex:1,
        padding:16,
        paddingTop:0,
    },
    filemaker_text: {
        fontSize:14,
        color:GrayColor,
        marginBottom:6,
    },
    filemiker_View: {
        height:186,
        width:(width-32)/4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filemiker_view_image: {
        width:(width-32)*0.24,
        height:140,
        borderRadius:2,
    },
    filemiker_view_name: {
        fontSize:14,
        color:GrayBlackColor,
        marginTop:6,
    },
    photos: {
        height: 200,
        flex:1,
        padding:16,
        paddingTop:0,
        borderColor: White,
        borderBottomWidth:1,
    },
    photos_text: {
        fontSize:14,
        color:GrayColor,
        marginBottom:6,
    },
    photos_item_image: {
        height:150,
        width:220,
        marginRight:4,
        borderRadius:2,
    },
    photos_loading: {
        width:150,
        height:150,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:4,
        backgroundColor: GrayColor,
        borderRadius:2,
    },
    photos_item_text: {
        fontSize:12,
        color:GrayWhiteColor,
    },
    photos_item_mask: {
        width:40,
        height:1,
        marginTop:4,
        marginBottom:4,
        backgroundColor:GrayWhiteColor,
    },
    photos_item_reloadtext: {
        fontSize:18,
        fontWeight: '500',
    },
    commentary: {
        width:width,
    },
    commentary_descr_view: {
        width:width,
        height:48,
        paddingLeft:16,
        paddingRight:16,
        justifyContent:'center',
        borderColor: White,
        borderBottomWidth:2,
    },
    commentary_descr_text: {
        color:GrayColor,
        fontSize:16,
        marginLeft:10,
        fontWeight:'500',
    },
    commentary_flatlist_view: {
        flex:1,
        width:width,
        paddingLeft:16,
        paddingRight:16,
    },
    commentary_item_loadmore_view: {
        width:width,
        height:56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentary_item_loadmore_text: {
        fontSize:16,
    },
    commentary_item_view: {
        flexDirection: 'row',
        marginTop:15,
        marginBottom:15,
    },
    commentary_item_auther_img: {
        width:36,
        height:36,
        marginRight:6,
        borderRadius:48,
        borderWidth:1,
    },
    commentary_item_view_top: {
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
    },
    commentary_item_view_top_left:{
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
    },
    commentary_item_view_top_name: {
        color:GrayBlackColor,
        marginRight:8,
        fontSize:16,
        fontWeight: '500',
        maxWidth:width/3,
    },
    commentary_item_view_top_right: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:6,
    },
    commentary_item_view_top_right_img:{
        width:16,
        height:16,
        marginRight:6,
    },
    commentary_item_view_top_right_num:{
        color:GrayColor,
        fontSize:12,
    },
    commentary_item_view_mid:{
        width:width-74
    },
    commentary_item_view_comment: {
        color:GrayBlackColor,
        fontSize:14,
        lineHeight:22,
        marginTop:4,
        marginBottom:4,
    },
    commentary_item_view_time: {
        color:GrayColor,
        fontSize:12,
        paddingRight:6,
        alignSelf: 'flex-end',
    }
}