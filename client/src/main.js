import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import Home from "./components/Home.vue";
import Block from "./components/Block.vue";


//set up VueRouter
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home},
  { path: '/block/:height', component: Block }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
