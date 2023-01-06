import apiInstance from "./apiInstance.js";
export const apiGetCityArea = () => apiInstance.get(`/cityArea/list`);
export const apiPostOptPassword = (data) => apiInstance.post(`/employer/password/otpChange`, data);
export const apiCaretakerPostOptPassword = (data) => apiInstance.post(`/caretaker/password/otpChange`, data);
export const apiOtpForget = (data) => apiInstance.post(`/otp/forget`, data);
export const apiCaretakerLogin = (data) => apiInstance.login(`/caretaker/login`, data);
export const apiOtpRegister = (data) => apiInstance.post(`/otp/register`, data);
export const apiRegisterCaretaker = (data) => apiInstance.post(`/caretaker/register`, data);
export const apiGetCaretaker = () => apiInstance.get(`/caretaker`);
export const apiPutCaretaker = (data) => apiInstance.put(`/caretaker`, data);
export const apiDeleteCaretaker = () => apiInstance.delete(`/caretaker`);
export const apiUpload = (data) => apiInstance.post(`/upload`,data);

export const apiLogout = (data) => apiInstance.logout(`/logout`, data);

//S2 
export const apiGetLanguage = () => apiInstance.get(`/checkbox/language/list`);
export const apiGetDisease = () => apiInstance.get(`/checkbox/disease/list`);
export const apiGetEatType = () => apiInstance.get(`/checkbox/eatType/list`);
export const apiGetAbilityToAct = () => apiInstance.get(`/checkbox/abilityToAct/list`);
export const apiGetServiceRequirement = ({id}) => apiInstance.get(`/checkbox/serviceRequirement/list?jobTypeId=${id}`);
export const apiGetWorkHourType = ({jobTypeId}) => apiInstance.get(`/radio/workHourType/list?jobTypeId=${jobTypeId}`);
export const apiGetLicense = () => apiInstance.get(`/radio/license/list`);
export const apiGetCountry = () => apiInstance.get(`/select/country/list`);
export const apiGetJobType = () => apiInstance.get(`/select/jobType/list`);
export const apiGetExperience = () => apiInstance.get(`/public/experience/list`);
export const apiGetPlaceType = () => apiInstance.get(`/public/placeType/list`);
export const apiPostPassword = (data) => apiInstance.post(`/employer/password/change`, data);
