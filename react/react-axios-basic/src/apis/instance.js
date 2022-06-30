import axios from "axios";
// 在根目錄env定義
const base = process.env.REACT_APP_URL;
// baseURL是你API的主要Domain，之後發請求時只要填相對路徑就可以了
const apiInstance = axios.create({
  baseURL: base,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

// Request Interceptors 請求攔截
apiInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log("'apis/instance.js'你要找的頁面不存在");
          // go to 404 page
          break;
        case 500:
          console.log("'apis/instance.js'程式發生問題");
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
    console.log(`${error.code},${error.message}`)
    // Promise.reject()
    return error;
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async login({ user, password }) {
    const res = await apiInstance.post("/login", {
      user,
      password,
    });
    // eslint-disable-next-line no-unused-vars
    const token = res.data.token;
    return Promise.reject(res.data);
  },
  async formDataPOST(url, data, config) {
    try {
      const form = new FormData();
      for (let key in data) {
        form.append(key, data[key]);
      }
      const res = await apiInstance.post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config,
      });
      return res.data;
    } catch (res) {
      return Promise.reject(res.data);
    }
  },
  async GET(url, params) {
    try {
      // 修改baseUrl的方式
      // apiInstance({ url: url, baseURL: 'http://new-url.com' })
      // console.log("apis/instance.js");
      const res = await apiInstance.get(url, {
        params,
      });
      return res.data;
    } catch (res) {
      return Promise.reject(res);
    }
  },
  async POST(...arge) {
    try {
      const res = await apiInstance.post(...arge);
      return res.data;
    } catch (res) {
      return Promise.reject(res);
    }
  },
  async PUT(...arge) {
    try {
      const res = await apiInstance.put(...arge);
      return res.data;
    } catch (res) {
      return Promise.reject(res);
    }
  },
  async DELETE(url, params) {
    try {
      const res = await apiInstance.delete(url, {
        params,
      });
      return res.data;
    } catch (res) {
      return Promise.reject(res);
    }
  },
};
