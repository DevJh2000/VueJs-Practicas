import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import { auth } from "./firebase";

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    const detectUser = {
      email: user.email,
      userID: user.uid,
    };
    store.dispatch("detecUserLog", detectUser);
  } else {
    store.dispatch("detecUserLog", user);
  }
});

Vue.config.productionTip = false;
Vue.use(VueMaterial);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
