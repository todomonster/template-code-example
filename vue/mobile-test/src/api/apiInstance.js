import axios from "axios";
import { Toast } from "@/components/global/swal";
import { useCookie, useStorage } from "@/utils/helper";
import { useGlobalStore } from "@/store/global";
import { initOS } from "@/utils/extCall";
const globalStore = useGlobalStore();

//env
const base = process.env.VUE_APP_API_BASE_URL;
const MODE = process.env.VUE_APP_MODE;
let LOGIN_ROUTER = MODE === "green" ? process.env.VUE_APP_OVERTIME_USER_PATH : process.env.VUE_APP_OVERTIME_STORE_PATH


const publicWord = "Myfrees ";

// 後端驗證token的關鍵字 = accessToken
const tokenKey = "accessToken";

// 後端刷新token的關鍵字 = refreshToken
const refreshTokenKey = "refreshToken";

// 預設 token 20 分鐘後過期
const tokenExpireMinutes = 20;
// 預設 refreshToken 14天後過期
const refreshTokenExpireMinutes = 14 * 24 * 60;
// api path
const refreshTokeUrl = `/token/refresh/`;
// 是否啟用收到401 自動刷新 token 機制
const turnOnRefreshToken = false;
// 把 token 存到 cookie
const saveInCookie = false;
// 把 token 存到 loacalStorage
const saveInStorage = true;

let token = "";
let refreshToken = "";

const apiInstance = axios.create({
  baseURL: base,
  timeout: 9000
});

// Request Interceptors 請求攔截
apiInstance.interceptors.request.use(
  async function (config) {
    if (globalStore.globalLoading == false) {
      globalStore.globalLoading = true;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response Interceptors 回應攔截
apiInstance.interceptors.response.use(
  function (response) {
    if (globalStore.globalLoading == true) {
      setTimeout(() => globalStore.globalLoading = false, 300);
    }
    return response;
  },
  function async(error) {
    globalStore.globalLoading = false;

    if (error.code === "ERR_NETWORK") {
      error.message = "網路出了點問題，請重新連線"
      return Promise.reject(error);
    }
    if (error.code === "ECONNABORTED") {
      Toast("timeout error");
      return Promise.reject(error);
    }
    if (error.response) {
      switch (error.response.status) {
        // 驗證失敗
        case 401:
          Toast(`${publicWord} token 驗證失敗`);
          // 當不是 refresh token 作業發生 401 才需要更新 access token 並重發
          if (error.config.url !== refreshTokeUrl && turnOnRefreshToken) {
            // 原始 request 資訊
            const config = error.config;
            refreshToken = useCookie.getItem(refreshTokenKey) || useStorage.getItem(refreshTokenKey);
            // 找不到 refreshToken 踢回登入
            if (!refreshToken) {
              toLogin();
              return;
            }
            // 有找到 refreshToken 做刷新 token
            /* eslint-disable */
            return axios.post(base + refreshTokeUrl, { refreshToken })
              .then(response => {
                // 儲存並更新 token & refreshToken
                saveToken(response);
                config.headers.Authorization = "Bearer " + token;
                return config;
              })
              // 重新發起之前的請求
              // https://github.com/axios/axios/issues/5143
              .then(config =>
                axios({
                  ...config,
                  headers: config.headers.toJSON()
                }))
              //更新失敗
              .catch((error) => {
                toLogin();
                return Promise.reject(error);
              })
            /* eslint-enable */
          }
          if (!turnOnRefreshToken) {
            toLogin();
            return Promise.reject(error);
          }

          break;
        case 404:
          Toast(`${publicWord} 你要找的頁面不存在`);
          // go to 404 page
          break;
        case 500:
          Toast(`${publicWord} '程式發生例外問題`);
          // go to 500 page
          break;
        default:
          Toast(error.message);
      }
    }
    if (!window.navigator.onLine) {
      Toast(`${publicWord} 網路出了點問題，請重新連線後重整網頁`);
      return;
    }

    return Promise.reject(error);
    // return error;
  }
);

function toLogin() {
  //把驗證改0
  localStorage.setItem("is_Login", 0)
  Toast("請重新登入");
  // 路由模式

  // 判斷作業系統
  setTimeout(() => {
    let os = initOS() || "";
    if (os == "android" || os == "ios") {
      // 有點
      window.location.href = `.${LOGIN_ROUTER}`
    } else {
      window.location.href = `${LOGIN_ROUTER}`
    }
  }, 1200);
}

function saveToken(response) {
  // save token
  token =
    response?.data?.data?.[tokenKey] ||
    response?.data?.[tokenKey] ||
    response?.data?.data?.token ||
    response?.data?.token ||
    response?.token ||
    "";
  // save refreshToken
  // eslint-disable-next-line
  refreshToken = response?.data?.data?.[refreshTokenKey] || response?.data?.[refreshTokenKey] || "";

  if (saveInCookie) {
    useCookie.setItem(tokenKey, token, tokenExpireMinutes);
    if (turnOnRefreshToken) {
      useCookie.setItem(refreshTokenKey, refreshToken, refreshTokenExpireMinutes);
    }
  }

  if (saveInStorage) {
    useStorage.setItem(tokenKey, token);
    if (turnOnRefreshToken) {
      useStorage.setItem(refreshTokenKey, refreshToken);
    }
  }

}

function takeToken() {
  if (saveInCookie) {
    return useCookie.getItem(tokenKey)
  }
  if (saveInStorage) {
    return useStorage.getItem(tokenKey)
  }
  return token;
}

export default {
  async login(url, data) {
    try {
      const response = await apiInstance.post(url, data);
      saveToken(response);
      apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async logout(url, data) {
    try {
      // clear token in storage
      localStorage.clear();
      // clear token in cookie
      useCookie.setItem(tokenKey, "", 0);
      useCookie.setItem(refreshTokenKey, "", 0);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async formDataLogin(url, data, config) {
    try {
      const form = new FormData();
      for (let key in data) {
        form.append(key, data[key]);
      }
      const response = await apiInstance.post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        ...config
      });
      saveToken(response);
      return response.data;
    } catch (response) {
      return Promise.reject(response.data);
    }
  },
  async formDataPOST(url, data, config) {
    try {
      const form = new FormData();
      for (let key in data) {
        form.append(key, data[key]);
      }
      const res = await apiInstance.post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        ...config
      });
      return res.data;
    } catch (res) {
      return Promise.reject(res.data);
    }
  },
  async get(url, params, baseURL) {
    try {
      // 修改baseUrl的方式
      token = takeToken();
      apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      let res = {};
      if (baseURL) {
        res = await apiInstance({ method: "get", url, params, baseURL });
      } else {
        res = await apiInstance({ method: "get", url, params });
      }
      return res?.data;
    } catch (res) {
      return Promise.reject(res);
    }
  },

  async post(url, data, baseURL) {
    try {
      token = takeToken();
      apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      let res = {};
      if (baseURL) {
        res = await apiInstance({ method: "post", url, data, baseURL });
      } else {
        res = await apiInstance({ method: "post", url, data });
      }

      return res?.data;
    } catch (res) {
      return Promise.reject(res);
    }
  },
  async put(url, data, baseURL) {
    try {
      token = takeToken();
      apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      let res = {};
      if (baseURL) {
        res = await apiInstance({ method: "put", url, data, baseURL });
      } else {
        res = await apiInstance({ method: "put", url, data });
      }
      return res?.data;
    } catch (res) {
      return Promise.reject(res);
    }
  },
  async delete(url, params, baseURL) {
    try {
      token = takeToken();
      apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      let res = {};
      if (baseURL) {
        res = await apiInstance({ method: "delete", url, params, baseURL });
      } else {
        res = await apiInstance({ method: "delete", url, params });
      }
      return res?.data;
    } catch (res) {
      return Promise.reject(res);
    }
  }
};
