<template>
  <div>
    <h2>Overview</h2>
    <div class="recent-tables">
      <TableWrapper
        v-if="this.dataLoaded"
        :headers="['height', 'hash', 'miner', 'timestamp']"
        :tableData="blocksTableData"
        :tableHeader="'Recent Blocks'"
        :type="'horizontal'"
      />
      <TableWrapper
        v-if="this.dataLoaded"
        :headers="['hash', 'from', 'to', 'amount', 'timestamp']" :tableData="transactionsTableData"
        :tableHeader="'Recent Transactions'"
        :type="'horizontal'"
      />
    </div>
  </div>
</template>

<script>
import TableWrapper from './Table/TableWrapper.vue';
import {convertToTableData} from '../utils/cleanTableData.js';

export default {
  name: 'home',
  data() {
    return {
      dataLoaded: false,
      // RawData is as it comes from the API, however it is in wrong format to be passed to the Table component 
      blocksRawData: [],
      transactionsRawData: [],
      // TableData is a re-formatted form of RawData. As well as reformtting, it includes a "to" property for data where a router-link can be included
      blocksTableData: [],
      transactionsTableData: [],

    }
  },
  async mounted() {
    let blocks = await this.getData('blocks');
    let transactions = await this.getData('transactions');
    
    this.blocksRawData = blocks;
    this.transactionsRawData = transactions;

    this.dataLoaded = true;

    this.blocksTableData = blocks.map(block => convertToTableData(block, 'block'));
    this.transactionsTableData = transactions.map(transaction => convertToTableData(transaction, 'transaction'));
  },
  methods: {
    async getData(endpoint) {
      try {
        let response = await fetch(`https://xi.test.network/${endpoint}`);
        const data = await response.json();
        return data
      } catch (error) {
        console.log(error);
      }
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