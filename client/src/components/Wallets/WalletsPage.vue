<template>
  <div>
    <TableWrapper 
      :tableData="wallets"
      :headers="['address', 'balance', 'nonce']"
      :tableHeader="'Wallets'"
      :type="'horizontal'"
    />
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import {convertToTableData} from '../../utils/cleanTableData.js';

export default {
  name: "WalletsPage",
  data() {
    return {
      wallets: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let response = await fetch(`https://xi.test.network/wallets`);
        const wallets = await response.json();        
        this.wallets = wallets.map(wallet => convertToTableData(wallet, 'wallet'))
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