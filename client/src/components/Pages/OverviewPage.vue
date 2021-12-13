<template>
  <div class="overview-page">
    <div class="page-title">
      <h2>{{ title }}</h2>
      <div class="subtitle">
        <h3>{{ subtitle }}:  <span class="id">{{ id }}</span></h3>
        <Clipboard v-on:copy="copyToClipboard" />
      </div>
    </div>
    <div class="overview-table">
      <TableWrapper
        v-if="dataLoaded"
        :tableData="overviewData"
        :headers="headers"
        :tableHeader="title + ' Overview'"
        :type="'vertical'"
      />
    </div>
    <Summary v-if="dataLoaded" :title="title" :item="overviewData" />
    
    <div class="transactions-table" v-if="overviewData.transactions && dataLoaded">
      <TableWrapper
        :tableData="overviewData.transactions"
        :headers="['hash', 'date', 'time', 'block', 'from', 'to', 'amount', 'fee', 'memo']"
        :tableHeader="title + ' Transactions'"
        :type="'horizontal'"
        :page="page ? page : 1"
        :lastPage="overviewData.totalTxs && Math.ceil(parseInt(overviewData.totalTxs.data) / 10)"
      />
    </div>
    <Loader v-if="dataLoading"/>
  </div>
</template>

<script>
import TableWrapper from "../Table/TableWrapper.vue";
import Summary from "../Summary/Summary.vue";
import Clipboard from "../Clipboard/Clipboard.vue";
import Loader from "../Loader/Loader.vue"
import {fetchData} from "../../utils/fetchData.js";

export default {
  name: "OverviewPage",
  props: ['title', 'headers', 'endpoint', 'id', 'page'],
  data() {
    return {
      overviewData: {},
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
    subtitle() {
      let subtitle;
      switch (this.title) {
        case 'Block':
          subtitle = 'Height'
          break;
        case 'Transaction':
          subtitle = 'Hash'
          break;
        case 'Wallet':
          subtitle = 'Address'
          break;
        default:
          break;
      } 
      return subtitle;
    },
    signal() {
      return this.controller.signal
    }
  },
  created() {
    this.setInitialData();
    this.pollData();
  },
  beforeDestroy () {
    // abort any requests and stop polling when changing page
    clearInterval(this.polling);
    this.controller.abort(); 
  },
  watch: {
    // update data if changing overview (i.e. block 5 -> block 10)
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
      this.overviewData = response;
    },
    async setInitialData () {
      this.dataLoading = true; //turn on loading spinner
      await this.getData(); // acquire data
      this.dataLoading = false; //turn off loading spinner
      this.dataLoaded = true; 
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.id);
    }
  },
  components: {
    TableWrapper,
    Loader,
    Summary,
    Clipboard
  },
}
</script>

<style>
.overview-page {
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 100%;
  row-gap: 30px;
}

.overview-page .page-title {
  text-align: left;
  grid-row: 1;
}

.overview-page .page-title .subtitle {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.overview-page .page-title h3 {
  font-size: 1rem;
}

.overview-page .page-title h3 .id {
  font-weight: 500;
}

.clipboard-icon {
  position: relative;
  height: 1rem;
  padding: 3px;
  border-radius: 5px;
}

.clipboard-icon:hover {
  fill: var(--xi-orange);
  cursor: pointer;
}

@media screen and (min-width: 750px) {
  .overview-page {
    grid-template-rows: repeat(3, auto);
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