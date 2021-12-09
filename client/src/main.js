import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import Home from "./components/Home.vue";
import BlocksPage from "./components/Blocks/BlocksPage.vue";
import WalletsPage from "./components/Wallets/WalletsPage.vue";
import TransactionsPage from "./components/Transactions/TransactionsPage.vue";
import BlockOverviewPage from "./components/Blocks/BlockOverviewPage.vue";
import WalletOverviewPage from "./components/Wallets/WalletOverviewPage.vue";
import TransactionOverviewPage from "./components/Transactions/TransactionOverviewPage.vue";


//set up VueRouter
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home},
  { path: '/blocks', component: BlocksPage },
  { path: '/transactions', component: TransactionsPage },
  { path: '/wallets', component: WalletsPage },
  { path: '/blocks/:height', component: BlockOverviewPage },
  { path: '/blocks/:height/transactions/:hash', component: TransactionOverviewPage },
  { path: '/wallets/:address', component: WalletOverviewPage },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
