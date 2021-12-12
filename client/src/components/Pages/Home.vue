<template>
  <div class="home-page">
    <h2>XI Overview</h2>
    <div class="recent-tables">
      <div class="recent-blocks">
        <TableWrapper
          v-if="this.loaded"
          :headers="['height', 'hash', 'miner', 'totalTxs', 'when']"
          :tableData="blocks"
          :tableHeader="'Recent Blocks'"
          :type="'horizontal'"
        />
      </div>
      <div class="recent-transactions">
        <TableWrapper
          v-if="this.loaded"
          :headers="['hash', 'from', 'to', 'amount', 'when']" :tableData="transactions"
          :tableHeader="'Recent Transactions'"
          :type="'horizontal'"
        />
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
      controller: new AbortController(),
    }
  },
  computed: {
    signal() {
      return this.controller.signal
    }
  },
  async mounted() {
    this.loading = true;
    this.blocks = await this.getData('/blocks');
    this.transactions = await this.getData('/transactions');
    this.loading = false;
    this.loaded = true;
  },
  unmounted() {
    this.controller.abort(); // abort any requests on unmount
  },
  methods: {
    async getData(endpoint) {
      const data = await fetchData(endpoint, this.signal);
      return data;
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