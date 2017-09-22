let mErrorCode = 0;
let mErrorMsg = "未知错误";

export default class ErrorBean {

    setErrorCode(code) {
        if (code != null && typeof code == 'number') {
            mErrorCode = code;
        }
    }

    getErrorCode() {
        return mErrorCode;
    }
    
    setErrorMsg(msg) {
        if (msg != null && msg.length>0) {
            mErrorMsg = msg;
        }
    }
    
    getErrorMsg() {
        return mErrorMsg;
    }
    
}