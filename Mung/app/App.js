import {
    StackNavigator,
    TabNavigator
} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import Home from './pages/movie/Movie'
import {MainBg,MainColor,GrayColor} from './pages/base/BaseStyle'

/*
* 实现底部Tab
* */
const MainTabPage = TabNavigator({
    Home:{screen: Home},
},{
    animationEnabled: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: {MainColor},
        inactiveTintColor: {GrayColor},
        showIcon: true,
        indicatorStyle: {
            height: 0,
        },
        style: {
            backgroundColor: {MainBg}
        },
        labelStyle: {

        }
    }
})

/*
* 实现跳转的栈
* */
const App = StackNavigator({
    MainTabPage: {screen:MainTabPage},
    Home: {screen:Home}
},{
    navigationOptions: {
        gesturesEnabled: true
    },
    headerMode: 'none',
    transitionConfig:()=>{
        screenInterpolator: CardStackStyleInterpolator.forHorizontal
    }
})



export default App