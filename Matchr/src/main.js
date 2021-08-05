import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from 'firebase';

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCmJg2v1i0jL75cmu0fwKVJEIiSfMGLxK4",
  authDomain: "pickr-8c584.firebaseapp.com",
  projectId: "pickr-8c584",
  storageBucket: "pickr-8c584.appspot.com",
  messagingSenderId: "946087918083",
  appId: "1:946087918083:web:661bbcca7e40a12822ac36",
  measurementId: "G-TSWGJ0780C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
