<template>
  <div>
    <h2><span>{{ title }}</span>: {{ id }}</h2>
    <TableWrapper 
      v-if="dataLoaded"
      :tableData="overviewData"
      :headers="headers"
      :tableHeader="title + ' Overview'"
      :type="'vertical'"
    />
    
    <TableWrapper
      v-if="overviewData.transactions && dataLoaded"
      :tableData="overviewData.transactions"
      :headers="['date', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo']"
      :tableHeader="title + ' Transactions'"
      :type="'horizontal'"
    />
    <Loader v-if="dataLoading"/>
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import Loader from "../Loader/Loader.vue"
import {fetchData} from "../../utils/fetchData.js";

export default {
  name: "OverviewPage",
  props: ['title', 'headers', 'endpoint', 'id'],
  data() {
    return {
      overviewData: {},
      dataLoading: false,
      dataLoaded: false,
    }
  },
  created() {
    this.getData(this.endpoint); //fetch the block data on creating component
  },
  watch: {
    // update block data if the route changes
    $route(to, from) {
      if (to !== from) {
        this.dataLoaded = false;
        this.getData(this.endpoint);
      }
    }
  },
  methods: {
    async getData(endpoint) {
      this.dataLoading = true;
      this.overviewData = await fetchData(endpoint);
      this.dataLoading = false;
      this.dataLoaded = true;
    },
  },
  components: {
    TableWrapper,
    Loader
  }
}
</script>

<style>

</style>