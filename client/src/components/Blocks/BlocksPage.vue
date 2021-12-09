<template>
  <div>
    <TableWrapper 
      :tableData="blocks"
      :headers="['timestamp', 'height', 'hash', 'parentHash', 'ledgerHash', 'miner', 'numTransactions']"
      :tableHeader="'Blocks'"
      :type="'horizontal'"
    />
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import {convertToTableData} from '../../utils/cleanTableData.js';

export default {
  name: "BlocksPage",
  data() {
    return {
      blocks: [],
    }
  },
  created() {
    this.getData(); //fetch the block data on creating component
  },
  methods: {
    async getData() {
      try {
        let response = await fetch(`https://xi.test.network/blocks`);
        const blocks = await response.json();        
        this.blocks = blocks.map(block => convertToTableData(block, 'block'))
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