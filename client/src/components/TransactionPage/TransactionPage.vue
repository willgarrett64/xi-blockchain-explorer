<template>
  <div>
    <p>This is TRANSACTION {{ $route.params.hash }} page</p>
    <table>
      <tr><th>Timestamp</th><td>{{ transaction.timestamp.data }}</td></tr>
      <tr><th>Block</th><td>{{ transaction.block.data }}</td></tr> 
      <tr><th>Hash</th><td>{{ transaction.hash.data }}</td></tr>
      <tr><th>From</th><td>{{ transaction.from.data }}</td></tr>
      <tr><th>To</th><td>{{ transaction.to.data }}</td></tr>
      <tr><th>Amount</th><td>{{ transaction.amount.data }}</td></tr>
      <tr><th>Fee</th><td>{{ transaction.fee.data }}</td></tr>
      <tr><th>Memo</th><td>{{ transaction.memo.data }}</td></tr>
    </table>
  </div>
</template>

<script>
import {convertToTableData} from '../../utils/cleanTableData.js';

export default {
  name: "TransactionPage",
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
  }
}
</script>

<style>

</style>