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

const jumpPager = (navigate,page,params) => {
    if (params != null) {
        navigate(page,{
            data:params
        })
    } else {
        navigate(page)
    }
}

export {TabOptions,jumpPager,width,height}