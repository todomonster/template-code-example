import apiInstance from "./apiInstance.js";
import { parseUrlEncode } from "@/utils/helper"

// 命名規則: 如果是 CRUD 動詞+名詞 ex:GetStore 
// urlencoded form x


/**
 * store
 */

/** city_area/list a-0-0*/
export const apiGetCityArea = () => apiInstance.get(`/city_area/list`);
export const apiGetCityList = () => apiInstance.get(`/city/list`);
export const apiGetAreaList = () => apiInstance.get(`/area/list`);
/** /notify/token 存 推播token form */
export const apiStoreSaveFcmToken = (data) => apiInstance.post(`/notify/token`, parseUrlEncode(data));
/** store/rewardRange S-1-11 x*/
export const apiGetRewardRange = () => apiInstance.get(`/rewardRange`);
export const apiLogout = () => apiInstance.logout();
// {{api_path}}/api/mobile/check/type/:type/:mobile
export const apiCheckAccount = ({ type, mobile }) => apiInstance.get(`/mobile/check/type/${type}/${mobile}`);

// =============================================簡訊
/** /mobile/verify/push_sms 發送簡訊 form */
export const apiPushOtp = (data) => apiInstance.formDataLogin(`/mobile/verify/push_sms`, (data));
/** /mobile/verify/:mobile form 驗證簡訊 */
export const apiVerifyOtp = (mobile, data) => apiInstance.formDataLogin(`/mobile/verify/${mobile}`, (data));

//  =============================================store 資料

/** store/forgotpwd a-1-1 urlencoded */
export const apiStoreForgetPwd = (data) => apiInstance.post(`/store/forgotpwd`, parseUrlEncode(data));
/** store/changepwd a-1-2 urlencoded */
export const apiStoreChangePwd = (data) => apiInstance.post(`/store/changepwd`, parseUrlEncode(data));
/** /api/store/remove */
export const apiStoreRemove = () => apiInstance.post(`/store/remove`);

/** store/regist a-1-3 form */
export const apiStoreRegister = (data) => apiInstance.formDataPOST(`/store/regist`, (data));
/** /v2/store/login a-1-4 form */
// 先用v1就好 除非要 "change_password"
export const apiStoreLogin = (data) => apiInstance.formDataLogin(`/v2/store/login`, (data));
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


/**
 * user
 */

// ============================================= 店家
/** GET /v2/store/list 取店家list query */
export const apiGetStoreList = (queryData) => apiInstance.get(`/v2/store/list?${parseUrlEncode(queryData)}`);
/** GET /store/:id 取店家detail */
export const apiGetStoreDetail = (id) => apiInstance.get(`/store/${id}`);
/** DELETE /store/favorite  移除最愛  url  */
// 注意 刪除如果是urlencoded就普通傳參數就好
export const apiUserRemoveFavorite = ({ store_id }) => apiInstance.delete(`/store/favorite?store_id=${store_id}`);
/** POST /store/favorite  加到最愛  form */
export const apiUserAddFavorite = (data) => apiInstance.formDataPOST(`/store/favorite`, data);

/** POST /store/report 回報店家 form */
export const apiUserReportStore = (data) => apiInstance.formDataPOST(`/store/favorite`, data);
// {
//     store_id:1,
//     option:0, //回報種類, 0:其他 1:店家已停業 2:無法使用優惠 3:款項有爭議(必填,string),
//     message:'',
// }

/** /user/forgotpwd urlencoded */
export const apiUserForgetPwd = (data) => apiInstance.post(`/user/forgotpwd`, parseUrlEncode(data));
/** /user/changepwd urlencoded */
export const apiUserChangePwd = (data) => apiInstance.post(`/user/changepwd`, parseUrlEncode(data));
/** /user/upd urlencoded */
export const apiUpdateUser = (data) => apiInstance.post(`/user/upd`, parseUrlEncode(data));

/** image/user form 上傳檔案 用post就好*/
export const apiUserUpload = (data) => apiInstance.post(`/image/user`, (data));

/** /notify/token 存 推播token form */
export const apiUserSaveFcmToken = (token) => apiInstance.post(`/notify/token`, parseUrlEncode({
    token,
    type: "user",
}));
/** v2/store/login a-1-4 form */
export const apiUserLogin = (data) => apiInstance.formDataLogin(`/v2/user/login`, (data));
/** /user/remove 軟刪除 */
export const apiRemoveUser = () => apiInstance.post(`/user/remove`);
/** /user 取得使用者資料 */
export const apiGetUserInfo = () => apiInstance.get(`/user`);


/** GET /store/:id 取店家detail */
export const apiRefreshPoint = () => apiInstance.get(`/user/point/refresh`);

/** POST /user/deal/reward  索取回饋  form */
export const apiUserApplyReward = (data) => apiInstance.formDataPOST(`/user/deal/reward`, data);
/** POST /user/deal/withdraw 提領申請 form */
export const apiUserApplyWithdraw = (data) => apiInstance.formDataPOST(`/user/deal/withdraw`, data);

/** GET /user/deal/record/list 申請紀錄列表 query */
export const apiGetUserRecordList = (queryData) => apiInstance.get(`/user/deal/record/list?${parseUrlEncode(queryData)}`);
// {
//     page:1,
//     limit:10,
//     startDate:'2022-11-01',
//     endDate:'2022-11-02'
// }

/** GET /user/deal/currency/list 福利金|超級點列表紀錄 query */
export const apiGetUserMoneyList = (queryData) => apiInstance.get(`/user/deal/currency/list?${parseUrlEncode(queryData)}`);
// {
//     page:1,
//     limit:10,
//     type:'point|balance',
//     startDate:'2022-11-01',
//     endDate:'2022-11-02'
// }


/** GET /user/store/:id/product/list 產品list */
export const apiUserGetProductList = (id) => apiInstance.get(`/user/store/${id}/product/list`);
/**
 GET /wallet/user 取點數 棄用
*/

// =============================================小鈴鐺
/** /user/notify/list S-1-12 x ?*/
export const apiUserGetNotifyList = (queryData) => apiInstance.get(`/user/notify/list?${parseUrlEncode(queryData)}`);
/** /user/notify/read S-1-13 urlencoded */
// 給id陣列 id=[1,2,3]?
export const apiUserReadNotify = (data) => apiInstance.post(`/user/notify/read`, parseUrlEncode(data));
/** /user/notify/unread S-1-14 x */
export const apiGetUserNotifyUnreadAmount = () => apiInstance.get(`/user/notify/unread`);