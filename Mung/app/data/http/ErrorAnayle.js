
const NetWork_Request_Error = 0;    //网络请求错误
const Nuknown_Error = 1; //未知错误

class ErrorAnayle {

    getErrorMsg(code) {
        if (code != null && code instanceof Number) {
            switch (code) {
                case 0:
                    return "网络请求错误";
            }
        }
        return "未知错误"
    }

}

export {NetWork_Request_Error,Nuknown_Error,ErrorAnayle}