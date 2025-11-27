import axios from "axios";
import { getResponseError } from "./errorUtils";

const BASE_URL = (process.env.REACT_APP_BASE_URL || "").replace(/['";]/g, "");

const api = axios.create({
  baseURL: BASE_URL,
});

// let token;
// if (localStorage.getItem("currentUser"))
//   token = JSON.parse(localStorage.getItem("currentUser")).token;

// Interceptor : ajoute automatiquement le token à chaque requête
api.interceptors.request.use((config) => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const token = JSON.parse(currentUser).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Retrieve api users
 * @returns {Array}
 */
export const getApiUsers = async () => {
  try {
    const res = await api.get(`${BASE_URL}api/users`, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Retrieve api portffolio
 * @returns {Array}
 */
export const getApiPortfolio = async () => {
  try {
    const res = await api.get(`${BASE_URL}api/portfolios`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Retrieve api portffolio By Id
 * @returns {Array}
 */
export const getApiPortfolioById = async (id) => {
  try {
    const res = await api.get(`${BASE_URL}api/portfolio/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Retrieve api portffolio
 * @returns {Array}
 */
export const ApiPortfolioAdd = async (data) => {
  try {
    const res = await api.post(`${BASE_URL}api/portfolio/new/add`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api portffolio update
 * @returns {Array}
 */
export const ApiPortfolioUpdate = async (id, data) => {
  try {
    const res = await api.put(`${BASE_URL}api/portfolio/update/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api portffolio
 * @returns {Array}
 */
export const ApiPortfolioDelete = async (id) => {
  try {
    const res = await api.delete(`${BASE_URL}api/portfolio/delete/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log(res);
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api portffolio upload
 * @returns {Array}
 */
export const ApiPortfolioUpload = async (data) => {
  try {
    const res = await api.post(`${BASE_URL}api/portfolio/new/upload`, data, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(res);
    return res.data;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api portffolio
 * @returns {Array}
 */
export const getApiSkills = async () => {
  try {
    const res = await api.get(`${BASE_URL}api/skills`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Retrieve api skill By Id
 * @returns {Array}
 */
export const getApiSkillById = async (id) => {
  try {
    const res = await api.get(`${BASE_URL}api/skill/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Retrieve api skill add
 * @returns {Array}
 */
export const ApiSkillAdd = async (data) => {
  try {
    const res = await api.post(`${BASE_URL}api/skill/new/add`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api skill update
 * @returns {Array}
 */
export const ApiSkillUpdate = async (id, data) => {
  try {
    const res = await api.put(`${BASE_URL}api/skill/update/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api portffolio
 * @returns {Array}
 */
export const ApiSkillDelete = async (id) => {
  try {
    const res = await api.delete(`${BASE_URL}api/skill/delete/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api user add
 * @returns {Array}
 */
export const ApiUserAdd = async (data) => {
  try {
    const res = await api.post(`${BASE_URL}api/user/new/add`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api portffolio upload
 * @returns {Array}
 */
export const ApiAvatarUpload = async (data) => {
  try {
    const res = await api.post(`${BASE_URL}api/avatar/upload`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};

/**
 * Retrieve api user delete
 * @returns {Array}
 */
export const ApiUserDelete = async (id) => {
  try {
    const res = await api.delete(`${BASE_URL}api/user/delete/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch (e) {
    const errorData = getResponseError(e);
    return errorData;
  }
};
