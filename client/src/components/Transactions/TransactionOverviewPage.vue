<template>
  <div>
    <h2>This is TRANSACTION {{ $route.params.hash }} page</h2>
    <TableWrapper 
      :tableData="transaction"
      :headers="['timestamp', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo']"
      :tableHeader="'Transaction Overview'"
      :type="'vertical'"
    />
  </div>
</template>

<script>
import TableWrapper from '../Table/TableWrapper.vue';
import {convertToTableData} from '../../utils/cleanTableData.js';

export default {
  name: "TransactionOverviewPage",
  data() {
    return {
      transaction: {},
    }
  },
  created() {
    this.getData(); //fetch the transaction data on creating component
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
        let response = await fetch(`https://xi.test.network/blocks/${this.$route.params.height}/transactions/${this.$route.params.hash}`);
        const transaction = await response.json();
        
        this.transaction = convertToTableData(transaction, 'transaction');
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    TableWrapper
  }
}
</script>

<style>

</style>