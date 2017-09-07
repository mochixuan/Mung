let mErrorCode = 0;
let mErrorMsg = "未知错误";

export default class ErrorBean {

    setErrorCode(code) {
        if (code != null && code instanceof Number) {
            mErrorCode = code;
        }
    }

    getErrorCode() {
        return mErrorCode;
    }
    
    setErrorMsg(msg) {
        if (msg != null && !msg.isEmpty()) {
            mErrorMsg = msg;
        }
    }
    
    getErrorMsg() {
        return mErrorMsg;
    }
    
}