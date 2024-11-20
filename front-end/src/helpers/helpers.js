import axios from "../interceptors/axios.js";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = "http://localhost:3000";

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, "error");
  });

export const api = {
    getWord: handleError(async id => {
        const res = await axios.get(`${baseURL}/words/` + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    }),
    getWords: handleError(async () => {
        const res = await axios.get(`${baseURL}/words`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    }),
    deleteWord: handleError(async id => {
        const res = await axios.delete(`${baseURL}/words/` + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    }),
    createWord: handleError(async payload => {
        const res = await axios.post(`${baseURL}/words`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    }),
    updateWord: handleError(async (payload) => {
        const res = await axios.put(`${baseURL}/words/` + payload._id, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    }),
    login: handleError(async payload => {
        try {
            const res = await axios.post(`${baseURL}/auth/login`, payload);
            return res;
        } catch (error) {
            return error.response;
        }
    }),
    register: handleError(async payload => {
        try {
            const res = await axios.post(`${baseURL}/auth/register`, payload);
            return res.data;
        } catch (error) {
            return error.response;
        }
    }),
    profile: handleError(async () => {
        try {
            const res = await axios.get(`${baseURL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return res.data;
        } catch (error) {
            return error.response;
        }
    }),
    logout: handleError(async refreshToken => {
        try {
            const res = await axios.post(`${baseURL}/auth/logout`, { refreshToken }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return res.data;
        } catch (error) {
            return error.response;
        }
    }),
    refresh: handleError(async (accessToken, refreshToken) => {
        try {
            const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return res.data;
        } catch (error) {
            return error.response;
        }
    }),
    updateProfile: handleError(async (payload) => {
        try {
            const res = await axios.put(`${baseURL}/auth/updateProfile`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return res;
        } catch (error) {
            return error.response;
        }
    }),
    resetPassword: handleError(async (payload) => {
        try {
            const res = await axios.put(`${baseURL}/auth/resetPassword`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return res;
        } catch (error) {
            return error.response;
        }
    }),
    translateWord: handleError(async (payload) => {
        try {
            const res = await axios.post(`${baseURL}/translate`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return res.data;
        } catch (error) {
            return error.response;
        }
    })
}