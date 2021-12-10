<template>
  <div>
    <h2>XI Overview</h2>
    <div class="recent-tables">
      <TableWrapper
        v-if="this.dataLoaded"
        :headers="['height', 'hash', 'miner', 'timestamp']"
        :tableData="blocks"
        :tableHeader="'Recent Blocks'"
        :type="'horizontal'"
      />
      <TableWrapper
        v-if="this.dataLoaded"
        :headers="['hash', 'from', 'to', 'amount', 'timestamp']" :tableData="transactions"
        :tableHeader="'Recent Transactions'"
        :type="'horizontal'"
      />
    </div>
  </div>
</template>

<script>
import TableWrapper from './Table/TableWrapper.vue';
import {fetchData} from '../utils/fetchData.js';

export default {
  name: 'home',
  data() {
    return {
      dataLoaded: false,
      blocks: [],
      transactions: [],
    }
  },
  async mounted() {
    this.blocks = await this.getData('/blocks');
    this.transactions = await this.getData('/transactions');
    this.dataLoaded = true;
  },
  methods: {
    async getData(endpoint) {
      const data = await fetchData(endpoint);
      return data;
    }
  },
  components: {
    TableWrapper,
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