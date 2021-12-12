import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import Home from "./components/Pages/Home.vue";
import ListAllPage from "./components/Pages/ListAllPage.vue";
import OverviewPage from "./components/Pages/OverviewPage.vue";



//set up VueRouter
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home},
  
  { 
    path: '/blocks', 
    component: ListAllPage,
    props: route => ({
      title: 'All Blocks',
      headers: ['date', 'time', 'height', 'hash', 'parentHash', 'ledgerHash', 'miner', 'totalTxs'],
      endpoint: '/blocks',
      page: route.query.page
    }),
  },
  { 
    path: '/blocks/:height', 
    component: OverviewPage,
    props: route => ({
      title: 'Block',
      headers: ['date', 'time', 'height', 'hash', 'parentHash', 'ledgerHash', 'miner', 'totalTxs'],
      id: route.params.height,
      endpoint: '/blocks/' + route.params.height
    }),
  },

  { 
    path: '/transactions', 
    component: ListAllPage,
    props: route => ({
      title: 'All Transactions',
      headers: ['date', 'time', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo'],
      endpoint: '/transactions',
      page: route.query.page
    })
  },
  { 
    path: '/transactions/:hash', 
    component: OverviewPage,
    props: route => ({
      title: 'Transaction',
      headers: ['date', 'time', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo'],
      id: route.params.hash,
      endpoint: '/transactions/' + route.params.hash
    })
  },

  { 
    path: '/wallets', 
    component: ListAllPage,
    props: route => ({
      title: 'All Wallets',
      headers: ['address', 'balance', 'nonce'],
      endpoint: '/wallets',
      page: route.query.page
    })
  },
  { 
    path: '/wallets/:address', 
    component: OverviewPage,
    props: route => ({
      title: 'Wallet',
      headers: ['address', 'balance', 'nonce'],
      id: route.params.address,
      endpoint: '/wallets/' + route.params.address,
      page: route.query.page
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
