import { Toast } from '@/components/global/swal';

export const errorHandle = (msg) => {
    const errorMessage = msg.message || msg.errorInfo || "失敗";
    if (typeof (errorMessage) == 'string') {
        if (errorMessage.indexOf('401') > -1) {
            Toast("Token過期")
            return;
        }
        if (errorMessage.indexOf('422') > -1 || errorMessage.indexOf('423') > -1) {
            Toast("例外錯誤")
            return;
        }
        Toast(errorMessage);
    }
    return errorMessage;
}