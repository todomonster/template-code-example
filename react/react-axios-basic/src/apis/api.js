// login
// formDataPOST
// GET
// POST
// PUT
// DELETE
import apiInstance from "./instance";
// ex: https://pokeapi.co/api/v2/pokemon/25/
// 管理路徑
export const apiPokemon = (id) => apiInstance.GET(`/pokemon/${id}/`);






















// ========================更多範例
// // User 相關的
// export const apiUserLogin =  (data) => apiInstance.POST("/signIn", data);

// // 文章相關的 api
// export const apiArticleItem =  () => apiInstance.GET("/ArticleItem");
// export const apiArticleMsg =  (data) =>
//   apiInstance.POST("/ArticleMsg", data);

// // 搜尋相關的 api
// export const apiSearch =  (data) =>
//   apiInstance.GET(`/Search?searchdata=${data}`);
