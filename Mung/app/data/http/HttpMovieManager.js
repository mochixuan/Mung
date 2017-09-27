
import {Nuknown_Error, NetWork_Request_Error, ErrorAnayle} from './ErrorAnayle'
import ErrorBean from "./ErrorBean";
import {insertMovie,queryMovie,deleteMovie} from '../realm/RealmManager'
import {Base} from '../constant/BaseContant'
import React from 'react'

/*基础链接头*/
const BaseUrl = "https://api.douban.com/v2"
/*正在热映*/
const Movie_Hoting_Url = "/movie/in_theaters"
/*top250*/
const Movie_UpComming_Url="/movie/top250"
/*口碑榜*/
const Movie_Praise_Url = "/movie/weekly"
/*北美票房榜*/
const Movie_North_Url = "/movie/us_box"
/*新片榜*/
const Movie_News_Url = "/movie/new_movies"
/*电影条目信息*/
const Movie_Detail_Url = '/movie/subject/'
/*电影搜索*/
const Movie_Search_Url = '/movie/search'
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

    /*获取短评论*/
    getCommenaryData(id,start,count) {
        return new Promise((resolve,reject) => {
            this.fetchNetData(BaseUrl+Movie_Detail_Url+id+"/comments"+"?start="+start+"&count="+count+"&"+Base.name+"="+Base.value)
                .then((data)=>{
                    if (data != null) {
                        if (data.code != null && typeof data.code == 'number') {
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

    /*电影列表数据*/
    getOtherMovieData(index,start,count) {
        let Suffix = Movie_UpComming_Url;
        let key = "";
        switch (index) {
            case 0:
                break;
            case 1:
                Suffix = Movie_Praise_Url;
                key = "&"+Base.name+"="+Base.value;
                break;
            case 2:
                Suffix = Movie_North_Url;
                break;
            case 3:
                Suffix = Movie_News_Url;
                key = "&"+Base.name+"="+Base.value;
                break;
        }
        return new Promise((resolve,reject) => {
            this.fetchNetData(BaseUrl+Suffix+"?start="+start+"&count="+count+key)
                .then((data)=>{
                    if (data != null) {
                        if (data.code != null && typeof data.code == 'number') {
                            reject(ErrorAnayle.getErrorBean(data.code))
                        } else if (data.subjects != null && data.subjects.length>0){
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

    /*搜索的数据*/
    getSearchData(index,str,start,count) {
        let type = "&q="
        if (index==1) {
            type = "&tag="
        }
        return new Promise((resolve,reject) => {
            this.fetchNetData(BaseUrl+Movie_Search_Url+"?start="+start+"&count="+count+type+str)
                .then((data)=>{
                    if (data != null) {
                        if (data.code != null && typeof data.code == 'number') {
                            reject(ErrorAnayle.getErrorBean(data.code))
                        } else if (data.subjects != null && data.subjects.length>0){
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