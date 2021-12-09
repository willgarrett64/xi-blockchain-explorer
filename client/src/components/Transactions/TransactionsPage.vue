<template>
  <div>
    <TableWrapper 
      :tableData="transactions"
      :headers="['timestamp', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo']"
      :tableHeader="'Transactions'"
      :type="'horizontal'"
    />
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import {convertToTableData} from '../../utils/cleanTableData.js';

export default {
  name: "TransactionsPage",
  data() {
    return {
      transactions: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let response = await fetch(`https://xi.test.network/transactions`);
        const transactions = await response.json();        
        this.transactions = transactions.map(transaction => convertToTableData(transaction, 'transaction'))
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    TableWrapper,
  }
}
</script>

<style>

</style>