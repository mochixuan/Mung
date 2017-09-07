
import {Nuknown_Error, NetWork_Request_Error, ErrorAnayle} from './ErrorAnayle'
import {ErrorBean} from "./ErrorBean";

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
                    if (data != null) {
                        if (data.code != null && data.code instanceof Number) {
                            reject(ErrorAnayle.getErrorBean(data.code))
                        } else if (data.count != null && data.count>0){
                            resolve(data)
                        } else {
                            reject(ErrorAnayle.getErrorBean(NetWork_Request_Error))
                        }
                    } else {
                        reject(ErrorAnayle.getErrorBean(NetWork_Request_Error))
                    }
                }).catch((error)=>{
                    if (error != null && error instanceof ErrorBean) {
                        reject(error)
                    } else {
                        reject(ErrorAnayle.getErrorBean(NetWork_Request_Error))
                    }
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
                    reject(ErrorAnayle.getErrorBean(NetWork_Request_Error))
                })
                .done();
        })
    }

}