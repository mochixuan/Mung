
import {ErrorAnayle,Nuknown_Error,NetWork_Request_Error} from './ErrorAnayle'

/*基础链接头*/
const BaseUrl = "https://api.douban.com/v2"
/*正在热映*/
const Movie_Hoting_Url = "/movie/in_theaters"

export default class HttpMovieManager {

    /*正在热映*/
    getHottingMovie() {
        return new Promise((resolve,reject) => {
            this.fetchNetData(BaseUrl+Movie_Hoting_Url)
                .then((data)=>{

                }).catch((error)=>{

            })
        })
    }

    /*请求数据=本地加网络*/
    fetchNetData(url) {
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then((response)=>response.json())
                .then((responseData)=>{
                    resolve(responseData);
                })
                .catch((error)=>{
                    reject(error)
                })
                .done();
        })
    }

}