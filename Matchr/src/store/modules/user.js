import { firestoreAction } from "vuexfire";
import { db } from "../../main";

const namespaced = true;

const state = {
  id: null,
  name: null,
  email: null,
  partnerId: null,
  movieApiPage: 1,
  matches: [],
};

const mutations = {
  SET_USER_DATA: (state, payload) => {
    state.id = payload.id;
    state.name = payload.name;
    state.email = payload.email;
    state.partnerId = payload.partnerId;
    state.movieApiPage = payload.movieApiPage;
  },
  CLEAR_USER_DATA: (state) => {
    state.id = null;
    state.name = null;
    state.email = null;
    state.partnerId = null;
    state.movieApiPage = 1;
    state.matches = [];
  },
  SET_PARTNER_ID: (state, payload) => {
    state.partnerId = payload;
  },
  SET_MOVIE_API_PAGE: (state, payload) => {
    state.movieApiPage = payload;
  },
};

const actions = {
  setUserData(context, userData) {
    context.commit("SET_USER_DATA", userData);
  },
  clearUserData(context, userData) {
    context.commit("CLEAR_USER_DATA", userData);
  },
  setPartnerId(context, id) {
    context.commit("SET_PARTNER_ID", id);
  },
  setMovieApiPage(context, pageNo) {
    context.commit("SET_MOVIE_API_PAGE", pageNo);
  },
  bindMatchesRef: firestoreAction((context) => {
    return context.bindFirestoreRef(
      "matches",
      db
        .collection("users")
        .doc(context.state.id)
        .collection("matches")
    );
  }),
};

const getters = {};

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
