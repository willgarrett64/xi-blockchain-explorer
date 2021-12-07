import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import Home from "./components/Home.vue";
import BlockPage from "./components/BlockPage/BlockPage.vue";


//set up VueRouter
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home},
  { path: '/blocks/:height', component: BlockPage },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
