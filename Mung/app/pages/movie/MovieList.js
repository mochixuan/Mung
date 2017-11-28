import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    RefreshControl,
    Modal,
    Platform,
} from 'react-native'
import {width, height, jumpPager} from '../../utils/Utils'
import ErrorBean from '../../data/http/ErrorBean'
import LinearGradient from 'react-native-linear-gradient'
import {show} from "../../utils/ToastUtils";
import HttpMovieManager from '../../data/http/HttpMovieManager'
import TouchableView from '../../widget/TouchableView'
import StarRating from 'react-native-star-rating'
import {
    MainBg, GrayBlackColor, BaseStyles, WhiteTextColor, GrayWhiteColor, Translucent, BlackTextColor,
    GrayColor, White
} from '../basestyle/BaseStyle'

import {queryThemeColor} from '../../data/realm/RealmManager'
import NaviBarView from "../../widget/NaviBarView";

const itemHight = 200;
const moviesCount = 20;

export default class MovieList extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)

        this.state={
            isInitSuccess: true,
            movieData:{},
            refreshing: true,
            MainColor: queryThemeColor(),
        }
        this.index = this.props.navigation.state.params.data.index;
        this.HttpMovies = new HttpMovieManager();
        this.requestData()
    }

    requestData() {
        let start = 0;
        if (this.state.movieData.subjects != null) {
            if (this.state.movieData.start != null) {
                start = this.state.movieData.start+1;
                if (this.state.movieData.total <= this.state.movieData.start*this.state.movieData.count) {
                    this.setState({
                        refreshing: false,
                    })
                    show("已是最新数据")
                    return;
                }
            } else {
                this.setState({
                    refreshing: false,
                })
                show("没有更多推荐")
                return;
            }
        }
        this.HttpMovies.getOtherMovieData(this.index,start,moviesCount)
            .then((movies)=>{
                let preSubjects = this.state.movieData.subjects;
                if (preSubjects != null && preSubjects.length>0) {
                    preSubjects.filter((item,i)=>{
                        return i<moviesCount;
                    }).forEach((item,i)=>{
                        movies.subjects.push(item)
                    })
                }
                if (movies.subjects[0].title == null) {
                    let subjects = [...movies.subjects.map(item=> item.subject)];
                    movies.subjects = subjects;
                }
                this.setState({
                    movieData:movies,
                    refreshing: false,
                    isInitSuccess: true,
                })
            })
            .catch((error)=>{
                this.setState({
                    refreshing: false,
                    isInitSuccess:false,
                })
                if (error != null && error instanceof ErrorBean) {
                    show(error.getErrorMsg())
                } else {
                    show("网络错误")
                }
            })
    }

    _getItemLayout(data, index) {
        return {length: itemHight,offset: itemHight*index,index}
    }

    _renderItemView(item){
        return (
            <TouchableView onPress={()=>{
                jumpPager(this.props.navigation.navigate,'MovieDetail',item.id)
            }}>
                <View style={styles.item}>
                    <Image
                        source={{uri:item.images.large}}
                        style={styles.item_img}/>
                    <View style={styles.item_right}>
                        <Text style={styles.item_right_title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.item_right_text} numberOfLines={1}>导演: {(item.directors[0]!=null?item.directors[0].name:"未知")}</Text>
                        <Text style={styles.item_right_text} numberOfLines={2}>主演: {item.casts.map((data,i)=>data.name).join(' ')}</Text>
                        <Text style={styles.item_right_text} numberOfLines={1}>{item.year}</Text>
                        <View style={styles.item_right_rating}>
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
                            <Text style={styles.item_right_rating_text}>{item.rating.average.toFixed(1)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableView>
        )
    }

    _refreshControlView() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({
                        refreshing: true
                    })
                    this.requestData()
                }}
                colors={['#ff0000', '#00ff00', '#0000ff']}
            />
        )
    }

    render() {
        if (this.state.movieData.subjects == null) {
            return (
                this.state.isInitSuccess?(
                    <Modal
                        animationType={"none"}
                        transparent={true}
                        visible={true}
                        onRequestClose={() => {
                            this.props.navigation.goBack()
                        }}>
                        <LinearGradient style={styles.loading_view} colors={[this.state.MainColor,WhiteTextColor]}>
                            <ActivityIndicator
                                animating={true}
                                color={this.state.MainColor}
                                size='large'/>
                            <Text style={[styles.loading_text,{color: this.state.MainColor}]}>loading</Text>
                        </LinearGradient>
                    </Modal>
                ):(
                    <LinearGradient style={styles.loading_view} colors={[this.state.MainColor,WhiteTextColor]}>
                        <TouchableOpacity onPress={()=>{
                            this.setState({isInitSuccess:true})
                            this.requestData()}}>
                            <Text style={[styles.reload_view,{color: this.state.MainColor, borderColor:this.state.MainColor}]}>reloading</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )

            )
        } else {
            return (
                <View style={styles.container}>
                    {/*状态栏*/}
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
                            <Text style={styles.toolbar_middle_text}>{this.props.navigation.state.params.data.title}</Text>
                        </View>
                        <View style={styles.toolbar_right_img}/>
                    </View>
                    {/*列表*/}
                    <FlatList
                        data = {this.state.movieData.subjects}
                        keyExtractor={(item,index)=>index}
                        renderItem={({item}) => this._renderItemView(item)}
                        refreshControl={this._refreshControlView()}
                        getItemLayout={(data,index)=> this._getItemLayout(data,index)}
                        showsVerticalScrollIndicator={false}/>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
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
        height:itemHight,
        width:width,
        flexDirection: 'row',
        padding:10,
        alignItems: 'center',
        borderColor:White,
        borderBottomWidth:1,
    },
    item_img: {
        width:96,
        height:155,
        borderRadius:4,
        marginRight:10,
    },
    item_right:{
        height:itemHight-20,
        flex:1,
        justifyContent:'center',
    },
    item_right_title: {
        color:GrayBlackColor,
        fontSize:16,
        fontWeight: '500',
        marginBottom: 10,
    },
    item_right_text: {
        fontSize:14,
        color:GrayColor,
        marginBottom: 4,
    },
    item_right_rating: {
        flexDirection: 'row',
        marginTop:6,
        alignItems: 'center',
    },
    item_right_rating_text: {
        fontSize: 14,
        color: '#ffcc33',
        fontWeight: '500',
        marginLeft: 8,
    }
})