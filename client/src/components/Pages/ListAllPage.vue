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
      polling: null,
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
    this.setInitialData();
    this.pollData();
  },
  beforeDestroy() {
    // abort any requests and stop polling when changing page
    clearInterval(this.polling);
    this.controller.abort(); 
  },
  watch: {
    // update data if changing list all view (i.e. blocks -> wallets)
    $route(to, from) {
      if (to !== from) {
        // abort any requests and stop polling, and set new controller
        clearInterval(this.polling)
        this.controller.abort();
        this.controller = new AbortController(); // create new controller
        
        this.dataLoaded = false;
        this.setInitialData();
        this.pollData()
      }
    }
  },
  methods: {
    // reacquire data every minute
    async pollData() {
      this.polling = setInterval(() => {
        this.getData();
      }, 60000)
    },
    async getData() {
      const response = await fetchData(this.fullEndpoint, this.signal);
      // if error returned, redirect to "page not found"
      if (response.error) {
        this.$router.replace('/*') ;
      }
      this.tableData = response
    },
    async setInitialData () {
      this.dataLoading = true; //turn on loading spinner
      await this.getData(); // acquire data
      this.dataLoading = false; //turn off loading spinner
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