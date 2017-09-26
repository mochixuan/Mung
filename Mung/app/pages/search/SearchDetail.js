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
    Modal,
} from 'react-native'
import {width, height, jumpPager} from '../../utils/Utils'
import ErrorBean from '../../data/http/ErrorBean'
import LinearGradient from 'react-native-linear-gradient'
import {show} from "../../utils/ToastUtils";
import HttpMovieManager from '../../data/http/HttpMovieManager'
import TouchableView from '../../widget/TouchableView'
import {
    MainBg, MainColor, GrayBlackColor, BaseStyles, WhiteTextColor, GrayWhiteColor, Translucent, BlackTextColor,
    GrayColor, White
} from '../basestyle/BaseStyle'


export default class SearchDetail extends Component {

    constructor(props) {
        super(props)
        this.state={
            isInitSuccess: false,
        }
        this.index = this.props.navigation.state.params.data
        this.HttpMovie = new HttpMovieManager();
    }

    requestData() {

    }

    render() {
        if (!this.state.isInitSuccess) {
            return (
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={!this.state.isInitSuccess}
                        onRequestClose={() => {
                            this.props.navigation.goBack()
                        }}>
                        <View style={styles.modal}>
                            <LinearGradient style={styles.modal_view} colors={[MainColor,WhiteTextColor]}>
                                <ActivityIndicator
                                    style={{marginRight:6}}
                                    animating={true}
                                    color={MainColor}
                                    size='large'/>
                                <Text style={styles.modal_text}>加载中</Text>
                            </LinearGradient>
                        </View>
                    </Modal>
            )
        }
    }

}

const styles = StyleSheet.create({
    modal: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    modal_view: {
        backgroundColor:White,
        width:200,
        height:200,
        borderRadius:10,
        elevation:8,
        shadowRadius:8,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom:10,
    },
    modal_text:{
        fontSize:16,
        color:MainColor,
        fontWeight:'500',
        marginTop:10,
    }
})