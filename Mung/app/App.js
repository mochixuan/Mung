import {
    StackNavigator,
    TabNavigator
} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import Movie from './pages/Movie'
import MovieDetail from './pages/MovieDetail'
import {MainBg,MainColor,GrayColor} from './pages/basestyle/BaseStyle'

/*
* 实现底部Tab
* */
const MainTabPage = TabNavigator({
    Movie:{screen: Movie},
},{
    animationEnabled: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: MainColor,
        inactiveTintColor: GrayColor,
        showIcon: true,
        upperCaseLabel: false,
        indicatorStyle: {
            height: 0,
        },
        style: {
            backgroundColor: MainBg,
            height:54,
        },
        labelStyle: {
            padding:0,
            margin:0,
        },
        iconStyle: {
            padding:0,
            margin:0,
        }
    }
})

/*
* 实现跳转的栈
* */
const App = StackNavigator({
    //MainTabPage: {screen:MainTabPage},
    Movie: {screen:Movie},
    MovieDetail:{screen:MovieDetail},
},{
    navigationOptions: {
        gesturesEnabled: true,
    },
    headerMode: 'float',
    transitionConfig:()=>{
        screenInterpolator: CardStackStyleInterpolator.forHorizontal
    }
})



export default App