
import {Nuknown_Error, NetWork_Request_Error, ErrorAnayle} from './ErrorAnayle'
import ErrorBean from "./ErrorBean";
import {insertMovie,queryMovie,deleteMovie} from '../realm/RealmManager'
import {Base} from '../constant/BaseContant'
import React from 'react'

/*基础链接头*/
const BaseUrl = "https://api.douban.com/v2"
/*正在热映*/
const Movie_Hoting_Url = "/movie/in_theaters"
/*电影条目信息*/
const Movie_Detail_Url = '/movie/subject/'
/*apikey*/
const DouBan_ApiKey='00aefce4d06e0bb7020cf6ae714a2325';

export default class HttpMovieManager {

    /*正在热映*/
    getHottingMovie(isInit,start,count) {
        if (!isInit) {
            let movies = queryMovie();
            if (movies != null && movies.length>0) {
                return new Promise((resolve,reject)=>{
                    resolve(movies[movies.length-1])
                })
            }
        }
        return new Promise((resolve,reject) => {
            this.fetchNetData(BaseUrl+Movie_Hoting_Url+"?start="+start+"&count="+count)
                .then((data)=>{
                    if (data != null) {
                        if (data.code != null && typeof data.code == 'number') {
                            reject(ErrorAnayle.getErrorBean(data.code))
                        } else if (data.count != null && data.count>0){
                            resolve(data)
                            insertMovie(data)
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

    /*电影条目详情*/
    getMovieDetail(id) {
        return new Promise((resolve,reject) =>{
            this.fetchNetData(BaseUrl+Movie_Detail_Url+id)
                .then((data)=>{
                    if (data != null && data.id != null) {
                        resolve(data)
                    } else if (data != null && data.code != null && typeof data.code == 'number') {
                        reject(ErrorAnayle.getErrorBean(data.code))
                    } else {
                        reject(ErrorAnayle.getErrorBean(NetWork_Request_Error))
                    }
                })
                .catch((error)=>{
                    if (error != null && error instanceof ErrorBean) {
                        reject(error)
                    } else {
                        reject(ErrorAnayle.getErrorBean(NetWork_Request_Error))
                    }
                })
        })
    }

    /*剧照*/
    getPhotoDatas(id,count) {
        return new Promise((resolve,reject) =>{
            this.fetchNetData(BaseUrl+Movie_Detail_Url+id+'/photos'+"?count="+count+"&"+Base.name+"="+Base.value)
                .then((data)=>{
                    if (data != null && data.count != null) {
                        resolve(data)
                    } else if (data != null && data.code != null && typeof data.code == 'number') {
                        reject(ErrorAnayle.getErrorBean(data.code))
                    } else {
                        reject(ErrorAnayle.getErrorBean(NetWork_Request_Error))
                    }
                })
                .catch((error)=>{
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