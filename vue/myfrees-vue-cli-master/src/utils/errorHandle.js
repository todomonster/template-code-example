import { Toast } from '@/components/global/swal';

export const errorHandle = (msg) => {
    const errorMessage = msg.message || msg.errorInfo || "失敗";
    if (typeof (errorMessage) == 'string') {
        Toast(errorMessage);
    }
    return errorMessage;
}