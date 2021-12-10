import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import Home from "./components/Home.vue";
import ListAllPage from "./components/Pages/ListAllPage.vue";
import OverviewPage from "./components/Pages/OverviewPage.vue";



//set up VueRouter
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home},
  
  { 
    path: '/blocks', 
    component: ListAllPage,
    props: {
      title: 'All Blocks',
      headers: ['date', 'height', 'hash', 'parentHash', 'ledgerHash', 'miner', 'totalTxs'],
      endpoint: '/blocks'
    } 
  },{ 
    path: '/transactions', 
    component: ListAllPage,
    props: {
      title: 'All Transactions',
      headers: ['date', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo'],
      endpoint: '/transactions'
    } 
  },
  { 
    path: '/wallets', 
    component: ListAllPage,
    props: {
      title: 'All Wallets',
      headers: ['address', 'balance', 'nonce'],
      endpoint: '/wallets'
    } 
  },
  { 
    path: '/block/:height', 
    component: OverviewPage,
    props: route => ({
      title: 'Block',
      headers: ['date', 'time', 'height', 'hash', 'parentHash', 'ledgerHash', 'miner', 'totalTxs'],
      id: route.params.height,
      endpoint: '/blocks/' + route.params.height
    })
  },
  { 
    path: '/transaction/:hash', 
    component: OverviewPage,
    props: route => ({
      title: 'Transaction',
      headers: ['date', 'time', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo'],
      id: route.params.hash,
      endpoint: '/transactions/' + route.params.hash
    })
  },
  { 
    path: '/wallet/:address', 
    component: OverviewPage,
    props: route => ({
      title: 'Wallet',
      headers: ['address', 'balance', 'nonce'],
      id: route.params.address,
      endpoint: '/wallets/' + route.params.address
    })
  },

]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
