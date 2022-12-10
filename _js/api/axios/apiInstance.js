import axios from "axios";
//env
const base = process.env.VUE_APP_API_BASE_URL;
// 後端判斷API是否成功的關鍵字
const IsSuccessKey = "status";
// 後端驗證token的關鍵字 = accessToken
const tokenKey = "accessToken";

// 後端刷新token的關鍵字 = refreshToken
const refreshTokenKey = "refreshToken";

// 預設 token 20 分鐘後過期
const tokenExpireMinutes = 20;
// 預設 refreshToken 14天後過期
const refreshTokenExpireMinutes = 14 * 24 * 60;
// 打換tokenAPI的路徑
const refreshTokeUrl = `/token/refresh/`;
// 是否啟用自動換發token
const turnOnRefreshToken = true;
// 是否啟用自動存到 localStorage(若false則只會存在cookie)
const turnOnUseStorage = true;
// 踢回根目錄的檔案
const HtmlIndex = "./index.html"


// 客製化 cookie 方法
const useCookie = {
  setItem(key, value, expireMinutes) {
    const date = new Date();
    date.setTime(date.getTime() + expireMinutes * 60 * 1000);
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
  },
  getItem(key) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const match = decodedCookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
    if (match) return match[2];
    else return null;
  }
};
const useStorage = {
  setItem(key, value) {
    if (turnOnUseStorage) {
      localStorage.setItem(key, value);
    }
  },
  getItem(key) {
    const item = localStorage.getItem(key) || "";
    return item;
  }
};

let token = "";
let refreshToken = "";

const apiInstance = axios.create({
  baseURL: base,
  timeout: 9000
});

// Request Interceptors 請求攔截
apiInstance.interceptors.request.use(
  async function (config) {
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
    // Do something with response data
    if (response.data[IsSuccessKey] === false) {
      // window.location.href = '/';
    }
    return response;
  },
  function async(error) {
    const publicWord = "NUBK";
    if (error.code === "ERR_NETWORK") {
      console.log(publicWord, error.message);
      return Promise.reject(error);
    }
    if (error.response) {
      switch (error.response.status) {
        // 驗證失敗
        case 401:
          console.log(`${publicWord} token 驗證失敗`);
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
                console.log(`驗證失敗||更新失敗`, error, 1000);
                toLogin();
                return Promise.reject(error);
              })
            /* eslint-enable */
          }

          break;
        case 404:
          console.log(`${publicWord} 'apis/instance.js'你要找的頁面不存在`);
          // go to 404 page
          break;
        case 500:
          console.log(`${publicWord} 'apis/instance.js'程式發生問題`);
          // go to 500 page
          break;
        default:
          console.log(error.message);
      }
    }
    if (!window.navigator.onLine) {
      alert("'apis/instance.js'網路出了點問題，請重新連線後重整網頁");
      return;
    }
    console.log(`${error.code},${error.message}`);
    return Promise.reject(error);
    // return error;
  }
);

function toLogin() {
  alert("請重新登入");
  window.location.href = HtmlIndex;
}

function saveToken(response) {
  // save token
  token =
    response?.data?.data?.[tokenKey] ||
    response?.data?.[tokenKey] ||
    response?.data?.data?.token ||
    response?.data?.token ||
    "";
  useCookie.setItem(tokenKey, token, tokenExpireMinutes);
  useStorage.setItem(tokenKey, token);
  // save refreshToken
  // eslint-disable-next-line
  refreshToken = response?.data?.data?.[refreshTokenKey] || response?.data?.[refreshTokenKey] || "";
  useCookie.setItem(refreshTokenKey, refreshToken, refreshTokenExpireMinutes);
  useStorage.setItem(refreshTokenKey, refreshToken);
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
      token = useCookie.getItem(tokenKey) || useStorage.getItem(tokenKey);
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
      token = useCookie.getItem(tokenKey) || useStorage.getItem(tokenKey);
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
      token = useCookie.getItem(tokenKey) || useStorage.getItem(tokenKey);
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
      token = useCookie.getItem(tokenKey) || useStorage.getItem(tokenKey);
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
