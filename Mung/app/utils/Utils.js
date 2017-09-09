import React from 'react'
import {
    Image,
    Dimensions
} from 'react-native'

const {width,height} = Dimensions.get('window');

const TabOptions = (labal,icon)=>{
    return ({
        tabBarLabel: labal,
        tabBarIcon: ({tintColor}) => (
            <Image
                style={{
                    width: 26,
                    height: 26,
                    tintColor:tintColor
                }}
                source={icon}
            />
        )
    })
}

export {TabOptions,width,height}