<template>
  <div>
    <h1>This is the HOME page</h1>
    <Table 
      v-if="this.dataLoaded"
      :headers="['height', 'hash', 'miner', 'timestamp']" 
      :tableData="blocksTableData"
    />
    <Table 
      v-if="this.dataLoaded"
      :headers="['hash', 'from', 'to', 'amount', 'timestamp']" :tableData="transactionsTableData"
    />
  </div>
</template>

<script>
import Table from './Table/Table.vue';
import {convertToTableData, addBlockToTransaction} from '../utils/cleanTableData.js';

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
    
    transactions.forEach(element => {
      element.block = addBlockToTransaction(element, blocks)
    });

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
    Table,
  }
}
</script>

<style>

</style>