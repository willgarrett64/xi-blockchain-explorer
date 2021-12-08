<template>
  <div>
    <p>This is BLOCK {{ $route.params.height }} page</p>
    <table>
      <tr><th>Timestamp</th><td>{{ block.timestamp.data }}</td></tr>
      <tr><th>Height</th><td>{{ block.height.data }}</td></tr>
      <tr><th>Block Hash</th><td>{{ block.hash.data }}</td></tr>
      <tr><th>Parent Hash</th><td>{{ block.parentHash.data }}</td></tr>
      <tr><th>Ledger Hash</th><td>{{ block.ledgerHash.data }}</td></tr>
      <tr><th>Miner</th><td>{{ block.miner.data }}</td></tr>
      <tr><th>Total Transactions</th><td>{{ block.numTransactions.data }}</td></tr>
    </table>

    <Table 
      :tableData="block.transactions.data"
      :headers="['hash', 'from', 'to', 'amount', 'timestamp']"
    />
  </div>
</template>

<script>
import Table from "../Table/Table.vue";
import {convertToTableData} from '../../utils/cleanTableData.js';

export default {
  name: "BlockPage",
  data() {
    return {
      block: {},
    }
  },
  created() {
    this.getData(); //fetch the block data on creating component
  },
  watch: {
    // update block data if the route changes
    $route(to, from) {
      if (to !== from) {
        this.getData();
      }
    }
  },
  methods: {
    async getData() {
      try {
        let response = await fetch(`https://xi.test.network/blocks/${this.$route.params.height}`);
        const block = await response.json();
        
        // need a way of adding the "block" property to the transactions
        block.transactions = block.transactions.map(transaction => convertToTableData(transaction, 'transaction'))

        this.block = convertToTableData(block, 'block');
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Table
  }
}
</script>

<style>

</style>