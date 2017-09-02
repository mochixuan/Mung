import {StackNavigator} from 'react-navigation'

import Main from './pages/main/Main'
import Home from './pages/movie/Movie'

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'

const App = StackNavigator({
    Main: {screen:Main},
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