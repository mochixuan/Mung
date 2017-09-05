import React from 'react'
import {
    Image
} from 'react-native'

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

export {TabOptions}