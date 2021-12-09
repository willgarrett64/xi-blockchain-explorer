<template>
  <div>
    <h2>This is WALLET {{ $route.params.address }} page</h2>
    <TableWrapper 
      :tableData="wallet"
      :headers="['address', 'balance', 'nonce']"
      :tableHeader="'Wallet Overview'"
      :type="'vertical'"
    />
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import {convertToTableData} from '../../utils/cleanTableData.js';

export default {
  name: "WalletOverviewPage",
  data() {
    return {
      wallet: {},
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
        let response = await fetch(`https://xi.test.network/wallets/${this.$route.params.address}`);
        const wallet = await response.json();
      
        this.wallet = convertToTableData(wallet, 'wallet');
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