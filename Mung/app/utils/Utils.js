import {Image} from 'react-native'

const TabOptions = (tabName,tabIcon) => {
    return {
        tabBarLabel: {tabName},
        tabBarIcon: (tintColor) => (
            <Image
                style={{
                    width: 26,
                    height: 26,
                    tintColor:{tintColor}
                }}
                source={tabIcon}
            />
        )
    }
}

export {TabOptions}