<template>
  <div class="list-all-page">
    <TableWrapper 
      v-if="dataLoaded"
      :tableData="tableData"
      :headers="headers"
      :tableHeader="title"
      :type="'horizontal'"
    />
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import {fetchData} from "../../utils/fetchData.js";

export default {
  name: "ListAllPage",
  props: ['title', 'headers', 'endpoint'],
  data() {
    return {
      tableData: [],
      dataLoaded: false,
    }
  },

  created() {
    this.getData(this.endpoint)
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
      this.tableData = await fetchData(endpoint);
      this.dataLoaded = true;
    },
  },
  components: {
    TableWrapper,
  }
}
</script>

<style>

</style>