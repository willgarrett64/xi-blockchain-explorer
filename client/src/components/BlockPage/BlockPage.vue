<template>
  <div>
    <p>This is BLOCK {{ $route.params.height }} page</p>
    <table>
      <tr><th>Timestamp</th><td>{{ block.timestamp }}</td></tr>
      <tr><th>Height</th><td>{{ block.height }}</td></tr>
      <tr><th>Block Hash</th><td>{{ block.hash }}</td></tr>
      <tr><th>Parent Hash</th><td>{{ block.parentHash }}</td></tr>
      <tr><th>Ledger Hash</th><td>{{ block.ledgerHash }}</td></tr>
      <tr><th>Miner</th><td>{{ block.miner }}</td></tr>
      <tr><th>Total Transactions</th><td>{{ block.transactions.length }}</td></tr>
    </table>

    <Table 
      :tableData="block.transactions"
      :headers="['hash', 'from', 'to', 'amount', 'timestamp']"
    />
  </div>
</template>

<script>
import Table from "../Table/Table.vue";

export default {
  name: "BlockPage",
  data() {
    return {
      block: {}
    }
  },
  computed: {
    
  },
  created() {
    this.getData();
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.block = this.getData();
      }
    }
  },
  methods: {
    async getData() {
      try {
        let response = await fetch(`https://xi.test.network/blocks/${this.$route.params.height}`);
        this.block = await response.json();
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