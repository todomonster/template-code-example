import { Toast } from '@/components/global/swal';
import {
    apiLogout,
    apiUserSaveFcmToken,
    apiStoreSaveFcmToken
} from "@/api/myfree";

const MODE = process.env.VUE_APP_MODE

export const errorHandle = async (msg) => {
    try {
        const errorMessage = msg.message || msg.errorInfo || "失敗";
        if (typeof (errorMessage) == 'string') {
            if (errorMessage.indexOf('401') > -1) {
                Toast("Token過期");
                // token過期登出後 不能有推播所以要更新
                // if (MODE === "green") {
                //     const response = await apiUserSaveFcmToken({
                //         token: "null",
                //     });
                // }else if (MODE === "orange") {
                //     const response = await apiStoreSaveFcmToken({
                //         token: "null",
                //         type: "store",
                //     });
                // }
                await apiLogout();
                return;
            }
            if (errorMessage.indexOf('500') > -1) {
                Toast("例外錯誤")
                return;
            }
            if (errorMessage.indexOf('400') > -1) {
                Toast("請求錯誤")
                return;
            }
            if (errorMessage.indexOf('422') > -1 || errorMessage.indexOf('423') > -1) {
                Toast("例外錯誤")
                return;
            }
            Toast(errorMessage);
        }
        return errorMessage;
    } catch (error) {
        console.log(error?.message)
    }
}