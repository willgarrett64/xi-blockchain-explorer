<template>
  <div class="list-all-page">
    <TableWrapper 
      v-if="dataLoaded"
      :tableData="tableData"
      :headers="headers"
      :tableHeader="title"
      :type="'horizontal'"
      :page="page ? page : 1"
    />
    <Loader v-if="dataLoading"/>
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import Loader from "../Loader/Loader.vue"
import {fetchData} from "../../utils/fetchData.js";

export default {
  name: "ListAllPage",
  props: ['title', 'headers', 'endpoint', "page"],
  data() {
    return {
      tableData: [],
      dataLoading: false,
      dataLoaded: false,
    }
  },
  computed: {
    fullEndpoint() {
      const query = this.page ? `?page=${this.page}` : ''
      return this.endpoint + query;
    }
  },
  created() {
    this.getData(this.fullEndpoint)
  },
  watch: {
    // update block data if the route changes
    $route(to, from) {
      if (to !== from) {
        this.dataLoaded = false;
        this.getData(this.fullEndpoint);
      }
    }
  },
  methods: {
    async getData(endpoint) {
      this.dataLoading = true;
      this.tableData = await fetchData(endpoint);
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