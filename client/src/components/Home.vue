<template>
  <div>
    <h1>This is the HOME page</h1>
    <Table :headers="['height', 'hash', 'miner', 'timestamp']" :tableData="latestBlocks"/>
    <Table :headers="['hash', 'from', 'to', 'amount', 'timestamp']" :tableData="latestTransactions"/>

  </div>
</template>

<script>
import Table from './Table/Table.vue';

export default {
  data() {
    return {
      latestBlocks: [],
      latestTransactions: [],
    }
  },
  computed: {
    cleanedBlocks: () => {

    },
    cleanedTransactions: () => {

    }
  },
  async created() {
    this.latestBlocks = await this.getData('blocks');
    this.latestTransactions = await this.getData('transactions');
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
    },
  },
  components: {
    Table
  }
}
</script>

<style>

</style>