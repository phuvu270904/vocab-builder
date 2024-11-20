import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    isAdmin: false,
    user: {},
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLoggedIn = status;
    },
    setUser(state, user) {
      state.user = user;
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    user(state) {
      return state.user;
    },
  },
});

export default store;
