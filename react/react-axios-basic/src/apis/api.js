
import apiInstance from "./instance";

//登入註冊
export const apiLogin = (data) => apiInstance.login(data);
export const apiRegister = (data) => apiInstance.POST(`/signup`, data);

//公告
export const apiEvents = () => apiInstance.GET(`/events`);

//商城 (商店&轉蛋&錢&背包)
export const apiProducts = () => apiInstance.GET(`/products`);
export const apiGachas = () => apiInstance.GET(`/gachas`);
export const apiGold = () => apiInstance.GET(`/economy`);
export const apiBuy = (data) => apiInstance.POST(`/buy`, data);

//瀏覽文章
export const apiArticles = () => apiInstance.GET(`/articles`);
export const apiTagArticles = () => apiInstance.GET(`/tagArticles`);
export const apiPostTagArticles = (id) =>
  apiInstance.POST(`/tagArticle/${id}`);
export const apiDeleteTagArticles = (id) =>
  apiInstance.DELETE(`/tagArticle/${id}`);

//專案
export const apiProjects = () => apiInstance.GET(`/projects`);
export const apiPostProjects = (data) => apiInstance.POST(`/project`, data);
export const apiGetProject = (id) => apiInstance.GET(`/project/${id}`);
export const apiDeleteProject = (id) => apiInstance.DELETE(`/project/${id}`);
export const apiPutProject = (id, data) =>
  apiInstance.PUT(`/project/${id}`, data);

//monster
export const apiBackpack = () => apiInstance.GET(`/user_backpack`);
export const apiMonster = () => apiInstance.GET(`/monster`);
export const apiPutMonster = (data) => apiInstance.PUT(`/monster`, data);

//任務(X)
export const apiMissions = () => apiInstance.GET(`/missions`);
