<template>
  <div class="home-page">
    <div class="recent-tables">
      <div class="recent-blocks" v-if="this.loaded">
        <TableWrapper
          :headers="['height', 'hash', 'miner', 'totalTxs', 'when']"
          :tableData="blocks"
          :tableHeader="'Recent Blocks'"
          :type="'horizontal'"
        />
        <router-link to="/blocks" class="view-all-button">View all blocks →</router-link>
      </div>
      <div class="recent-transactions" v-if="this.loaded">
        <TableWrapper
          :headers="['hash', 'from', 'to', 'amount', 'when']" :tableData="transactions"
          :tableHeader="'Recent Transactions'"
          :type="'horizontal'"
        />
        <router-link to="/transactions" class="view-all-button">View all transactions →</router-link>
      </div>
    </div>
    <Loader v-if="loading"/>
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import Loader from "../Loader/Loader.vue"
import {fetchData} from "../../utils/fetchData.js";

export default {
  name: 'home',
  data() {
    return {
      loaded: false,
      loading: false,
      blocks: [],
      transactions: [],
      polling: null,
      controller: new AbortController(),
    }
  },
  computed: {
    signal() {
      return this.controller.signal
    }
  },
  async created() {
    this.loading = true;
    await this.getData();
    this.loading = false;
    this.loaded = true;
    this.pollData()
  },
  beforeDestroy () {
    // abort any requests and stop polling when changing page
    this.controller.abort(); // abort any requests on unmount
    clearInterval(this.polling)
  },
  methods: {
    // reacquire data every minute
    async pollData() {
      this.polling = setInterval(() => {
        this.getData();
      }, 60000)
    },
    // acquire blocks and transactions data
    async getData() {
      const blockPromise = fetchData('/blocks', this.signal);
      const txPromise = fetchData('/transactions', this.signal);
      const [blocks, transactions] = await Promise.all([blockPromise, txPromise])

      

      this.blocks = blocks;
      this.transactions = transactions;
    },
  },
  components: {
    TableWrapper,
    Loader
  }
}
</script>

<style>
.recent-tables {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(2, 1fr);
  row-gap: 15px;
  justify-content: center;
}

.recent-blocks {
  grid-column: 1;
  grid-row: 1 / span 1;
}

.recent-transactions {
  grid-column: 1;
  grid-row: 2 / span 1;
}

.view-all-button {
  background-color: var(--xi-orange);
  padding: 5px;
  border-radius: 8px;
  margin-top: 10px;
  float: right;
  color: black;
  text-decoration: none;
}

.view-all-button:hover {
  background-color: var(--xi-dark-orange);
}



/* Put tables side by side on larger screens */
@media only screen and (min-width: 1100px) {
  .recent-tables {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 50px;
    grid-template-rows: 1fr;
  }

  .recent-blocks {
    grid-column: 1 /span 1;
    grid-row: 1 / span 1;
  }

  .recent-transactions {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }
}
</style>