

export default class HttpMovieManager {

    /*正在热映*/
    getHottingMovie() {
        return new Promise((resolve,reject) => {
            fetch()
        })
    }

    /*请求数据=本地加网络*/
    fetchNetData(url) {
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then((response)=>response.json())
                .then((responseData)=>{
                    if（!responseData || ）
                })
                .catch((error)=>{
                    reject(error)
                })
                .done();
        })
    }

}