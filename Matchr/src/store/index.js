import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import user from "./modules/user";
import {vuexfireMutations} from "vuexfire";

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    ...vuexfireMutations
  },
  actions: {},
  modules: {
    user,
  },
  plugins: [vuexLocal.plugin],
});
