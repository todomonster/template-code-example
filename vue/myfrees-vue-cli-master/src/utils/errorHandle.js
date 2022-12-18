import { Toast } from '@/components/global/swal';

export const errorHandle = (msg) => {
    const errorMessage = msg.message || msg.errorInfo || "失敗";
    if (typeof (errorMessage) == 'string') {
        if (errorMessage.indexOf(401)) {
            Toast("Token過期")
            return;
        }
        Toast(errorMessage);
    }
    return errorMessage;
}