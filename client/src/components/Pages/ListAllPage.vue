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
      controller: new AbortController(),
    }
  },
  computed: {
    fullEndpoint() {
      const query = this.page ? `?page=${this.page}` : ''
      return this.endpoint + query;
    },
    signal() {
      return this.controller.signal
    }
  },
  created() {
    this.getData(this.fullEndpoint)
  },
  unmounted() {
    this.controller.abort(); // abort any requests on unmount
  },
  watch: {
    // update data if the route changes
    $route(to, from) {
      if (to !== from) {
        this.controller.abort(); // if changing to new list all (i.e. blocks -> wallets) abort any previous requests
        this.controller = new AbortController(); // create new controller
        this.dataLoaded = false;
        this.getData(this.fullEndpoint); // make new request
      }
    }
  },
  methods: {
    async getData(endpoint) {
      this.dataLoading = true;
      const response = await fetchData(endpoint, this.signal);

      // if error returned, redirect to "page not found"
      if (response.error) {
        this.$router.replace('/*') 
      }

      this.tableData = response
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