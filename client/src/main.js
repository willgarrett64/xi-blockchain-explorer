import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import Home from "./components/Pages/Home.vue";
import ListAllPage from "./components/Pages/ListAllPage.vue";
import OverviewPage from "./components/Pages/OverviewPage.vue";
import PageNotFound from "./components/Pages/PageNotFound.vue";

// headers for different tables
const blockHeaders = ['height', 'date', 'time', 'hash', 'ledgerHash', 'miner', 'totalTxs'];
const txHeaders = ['hash', 'date', 'time', 'block', 'from', 'to', 'amount', 'fee', 'memo'];
const walletHeaders = ['address', 'balance', 'nonce'];


//define routes
const routes = [
  // home page route
  { path: '/', component: Home},
  
  // block routes
  { 
    path: '/blocks', 
    component: ListAllPage,
    props: route => ({
      title: 'All Blocks',
      headers: blockHeaders,
      endpoint: '/blocks',
      page: route.query.page
    }),
  },
  { 
    path: '/blocks/:height', 
    component: OverviewPage,
    props: route => ({
      title: 'Block',
      headers: blockHeaders,
      id: route.params.height,
      endpoint: '/blocks/' + route.params.height
    }),
  },

  // transaction routes
  { 
    path: '/transactions', 
    component: ListAllPage,
    props: route => ({
      title: 'All Transactions',
      headers: txHeaders,
      endpoint: '/transactions',
      page: route.query.page
    })
  },
  { 
    path: '/transactions/:hash', 
    component: OverviewPage,
    props: route => ({
      title: 'Transaction',
      headers: txHeaders,
      id: route.params.hash,
      endpoint: '/transactions/' + route.params.hash
    })
  },

  // wallet routes
  { 
    path: '/wallets', 
    component: ListAllPage,
    props: route => ({
      title: 'All Wallets',
      headers: walletHeaders,
      endpoint: '/wallets',
      page: route.query.page
    })
  },
  { 
    path: '/wallets/:address', 
    component: OverviewPage,
    props: route => ({
      title: 'Wallet',
      headers: walletHeaders,
      id: route.params.address,
      endpoint: '/wallets/' + route.params.address,
      page: route.query.page
    })
  },

  // catch all other routes and display Page Not Found
  {
    path: '*',
    component: PageNotFound
  }
]

//set up VueRouter
Vue.use(VueRouter);
const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
