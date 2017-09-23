import ErrorBean from './ErrorBean'

const Nuknown_Error = 0; //未知错误
const NetWork_Request_Error = 1;    //网络请求错误
const INVALID_APIKEY=104; //apikey无线
const BAD_REQUEST = 400; //请求的地址不存在或者包含不支持的参数
const UNAUTHORIZED = 401;  //数据未授权
const FORBIDDEN = 403;  //数据被禁止访问访问
const NOT_FOUND = 404;  //请求的资源不存在或被删除
const INTERNAL_SERVER_ERROR = 500;  //内部错误
const NEED_PERMISSION = 1000;  //数据未授权

class ErrorAnayle {

    static getErrorBean(code) {
        let errorBean = new ErrorBean();
        if (code != null && typeof code == 'number') {
            errorBean.setErrorCode(code);
            switch (code) {
                case Nuknown_Error:
                    errorBean.setErrorMsg("未知错误");
                    break;
                case NetWork_Request_Error:
                    errorBean.setErrorMsg("网络请求错误");
                    break;
                case INVALID_APIKEY:
                    errorBean.setErrorMsg("ApiKey无效了");
                    break;
                case BAD_REQUEST:
                    errorBean.setErrorMsg("请求的地址不存在或者包含不支持的参数");
                    break;
                case UNAUTHORIZED:
                    errorBean.setErrorMsg("数据未授权");
                    break;
                case FORBIDDEN:
                    errorBean.setErrorMsg("数据被禁止访问访问");
                    break;
                case NOT_FOUND:
                    errorBean.setErrorMsg("请求的资源不存在或被删除");
                    break;
                case INTERNAL_SERVER_ERROR:
                    errorBean.setErrorMsg("内部错误");
                    break;
                case NEED_PERMISSION:
                    errorBean.setErrorMsg("数据未授权");
                    break;
                default:
                    errorBean.setErrorMsg("未知错误");
                    break;
            }
        }
        return errorBean;
    }

}

export {NetWork_Request_Error,Nuknown_Error,ErrorAnayle}