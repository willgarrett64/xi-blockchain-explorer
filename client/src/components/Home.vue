<template>
  <div>
    <h2>XI Overview</h2>
    <div class="recent-tables">
      <TableWrapper
        v-if="this.loaded"
        :headers="['height', 'hash', 'miner', 'totalTxs', 'when']"
        :tableData="blocks"
        :tableHeader="'Recent Blocks'"
        :type="'horizontal'"
      />
      <TableWrapper
        v-if="this.loaded"
        :headers="['hash', 'from', 'to', 'amount', 'when']" :tableData="transactions"
        :tableHeader="'Recent Transactions'"
        :type="'horizontal'"
      />
      <Loader v-if="loading"/>
    </div>
  </div>
</template>

<script>
import TableWrapper from "./Table/TableWrapper.vue";
import Loader from "./Loader/Loader.vue"
import {fetchData} from "../utils/fetchData.js";

export default {
  name: 'home',
  data() {
    return {
      loaded: false,
      loading: false,
      blocks: [],
      transactions: [],
    }
  },
  async mounted() {
    this.loading = true;
    this.blocks = await this.getData('/blocks');
    this.transactions = await this.getData('/transactions');
    this.loading = false;
    this.loaded = true;
  },
  methods: {
    async getData(endpoint) {
      const data = await fetchData(endpoint);
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
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 750px) {
  .recent-tables {
    flex-direction: row;
  }
}
</style>