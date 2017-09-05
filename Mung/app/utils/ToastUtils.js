import Toast from 'react-native-root-toast'

let show = (data)=>{
    if(data != null) {
        Toast.show(data,{
            duration: Toast.durations.SHORT,
            position:-64,
            shadow: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: '#f5f5f5',
            textColor: '#222222',
        })
    }
}

export {show}