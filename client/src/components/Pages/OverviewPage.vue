<template>
  <div class="overview-page">
    <h2><span>{{ title }}</span>: {{ id }}</h2>
    <div class="overview-table">
      <TableWrapper
        v-if="dataLoaded"
        :tableData="overviewData"
        :headers="headers"
        :tableHeader="title + ' Overview'"
        :type="'vertical'"
      />
    </div>
    <div class="summary" v-if="dataLoaded">
      <h3 class="section-header">{{ title }} Summary</h3>
      <div class="summary-box">
        <p>Eventually there will be a nicely written summary here! It will contain all sorts of wonderful information, all of which is already contained in the table above.</p>
      </div>
    </div>
    
    <div class="transactions-table" v-if="overviewData.transactions && dataLoaded">
      <TableWrapper
        :tableData="overviewData.transactions"
        :headers="['date', 'time', 'block', 'hash', 'from', 'to', 'amount', 'fee', 'memo']"
        :tableHeader="title + ' Transactions'"
        :type="'horizontal'"
      />
    </div>
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
.overview-page {
  display: grid;
  grid-template-rows: 30px repeat(3, auto);
  grid-template-columns: 100%;
  row-gap: 20px;
}

.summary {
  display: flex;
  flex-direction: column;
  text-align: left;
  align-self: stretch;
}

.summary-box {
  flex-grow: 1;
}

.summary-box {
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  min-height: 100px;
  border-radius: 8px;
}

@media screen and (min-width: 750px) {
  .overview-page {
    grid-template-rows: 30px repeat(2, auto);
    grid-template-columns: 2fr 1fr;
    column-gap: 50px;
  }

  .page-title {
    grid-row: 1;
    grid-column: 1 / span 2;
  }

  .overview-table {
    grid-row: 2;
    grid-column: 1 / span 1;
  }

  .summary {
    grid-row: 2;
    grid-column: 2 / span 1;
  }  

  .transactions-table {
    grid-row: 3;
    grid-column: 1 /span 2;
  }
}
</style>