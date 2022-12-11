import apiInstance from "./apiInstance.js";
import { parseUrlEncode } from "@/utils/helper"

// 命名規則: 如果是 CRUD 動詞+名詞 ex:GetStore 
// urlencoded form x
/** city_area/list a-0-0*/
export const apiGetCityArea = () => apiInstance.get(`/city_area/list`);
// =============================================簡訊
/** /mobile/verify/push_sms 發送簡訊 form */
export const apiPushOtp = (data) => apiInstance.formDataLogin(`/mobile/verify/push_sms`, (data));
/** /mobile/verify/:mobile form 驗證簡訊 */
export const apiVerifyOtp = (mobile, data) => apiInstance.formDataLogin(`/mobile/verify/${mobile}`, (data));

//  =============================================store 資料
/** store/rewardRange S-1-11 x*/
export const apiGetRewardRange = () => apiInstance.get(`/rewardRange`);

/** store/forgotpwd a-1-1 urlencoded */
export const apiStoreForgetPwd = (data) => apiInstance.post(`/store/forgotpwd`, parseUrlEncode(data));
/** store/changepwd a-1-2 urlencoded */
export const apiStoreChangePwd = (data) => apiInstance.post(`/store/changepwd`, parseUrlEncode(data));

/** store/regist a-1-3 form */
export const apiStoreRegister = (data) => apiInstance.formDataPOST(`/store/regist`, (data));
/** v2/store/login a-1-4 form */
export const apiStoreLogin = (data) => apiInstance.formDataLogin(`/store/login`, (data));
/** store a-1-5 x */
export const apiGetStore = () => apiInstance.get(`/store`);

/** image/store a-1-6 form=>上傳用post就好 */
export const apiStoreUpload = (data) => apiInstance.post(`/image/store`, (data));
/** store/upd a-1-7 urlencoded */
export const apiUpdateStore = (data) => apiInstance.put(`/store/upd`, parseUrlEncode(data));

// =============================================店家錢包
/** wallet/store a-1-9 x */
export const apiGetWallet = () => apiInstance.get(`/wallet/store`);

// =============================================店家商品
/** product/shop a-2-1 urlencoded */
export const apiAddProduct = (data) => apiInstance.post(`/product/store`, parseUrlEncode(data));
/** product/shop 店家取得自有商品列表 a-2-2 x */
export const apiGetProductList = () => apiInstance.get(`/product/store`);
/** product/shop/:productId 店家取得單一自有商品資訊 a-2-3 x */
export const apiGetProduct = (productId) => apiInstance.get(`/product/store/${productId}`);
/** product/shop/:productId 修改一筆商品 a-2-4 urlencoded */
export const apiUpdateProduct = (productId, data) => apiInstance.put(`/product/store/${productId}`, parseUrlEncode(data));
/** product/shop/:productId 店家刪除自有商品 a-2-5 x */
export const apiDeleteProduct = (productId) => apiInstance.delete(`/product/store/${productId}`);

// =============================================索取回饋申請單
/** /store/deal/reward/:id/response S-1-2 form */
export const apiResponseRewardApply = (rewardId, data) => apiInstance.post(`/store/deal/reward/${rewardId}/response`, parseUrlEncode(data));
/** /store/deal/reward/list 取回饋列表 S-1-5 x ?*/
export const apiGetRewardApplyList = (queryData) => apiInstance.get(`/store/deal/reward/list?${parseUrlEncode(queryData)}`);
/** /store/deal/money/list 取得錢包列表 操作log S-1-7 x ?*/
export const apiGetMoneyLogList = (queryData) => apiInstance.get(`/store/deal/money/list?${parseUrlEncode(queryData)}`);

// =============================================小鈴鐺
/** /store/notify/list S-1-15 x ?*/
export const apiGetNotifyList = (queryData) => apiInstance.get(`/store/notify/list?${parseUrlEncode(queryData)}`);
/** /store/notify/read S-1-16 urlencoded */
// 給id陣列 id=[1,2,3]
export const apiReadNotify = (data) => apiInstance.post(`/store/notify/read`, parseUrlEncode(data));
/** /store/notify/unread S-1-17 x */
export const apiGetNotifyUnreadAmount = () => apiInstance.get(`/store/notify/unread`);

// =============================================產生QRcode
export const apiGenQrcode = (data) => apiInstance.formDataPOST(`/qr/generate`, data);