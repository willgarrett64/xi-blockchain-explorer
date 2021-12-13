<template>
  <div class="overview-page">
    <div class="page-title">
      <h2>{{ title }}</h2>
      <div class="subtitle">
        <h3>{{ subtitle }}:  <span class="id">{{ id }}</span></h3>
        <svg v-on:click="copyToClipboard" class="clipboard-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"><g><g><path d="m425.5,85.5h-61.9c-1.8-13.9-3.1-24.2-3.1-24.2-1.3-10.2-10-17.9-20.4-17.9h-63.5v-12c0-11.3-9.2-20.4-20.5-20.4-11.3,0-20.5,9.1-20.5,20.4v12h-63.6c-10.4,0-19.1,7.7-20.4,17.9l-3,24.2h-62c-11.3,0-20.5,9.1-20.5,20.4v374.6c0,11.3 9.2,20.4 20.5,20.4h338.9c11.3,0 20.5-9.1 20.5-20.4v-374.6c0.1-11.2-9.1-20.4-20.5-20.4zm-235.4-1.2h131.9l6.7,53.2h-145.3l6.7-53.2zm214.9,375.9h-297.8v-333.8h36.3l-3.6,29c-0.7,5.8 0,22.9 20.4,22.9h191.7c0.1,0 0.1,0 0.2,0 11.4,0 20.5-9.1 20.5-20.4 0-0.7-1.7-14.5-3.9-31.5h36.2v333.8z"/></g></g>
        </svg>
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
    <div class="summary" v-if="dataLoaded">
      <h3 class="section-header">{{ title }} Summary</h3>
      <div class="summary-box">
        <p>Eventually there will be a nicely written summary here! It will contain all sorts of wonderful information, all of which is already contained in the table above.</p>
      </div>
    </div>
    
    <div class="transactions-table" v-if="overviewData.transactions && dataLoaded">
      <TableWrapper
        :tableData="overviewData.transactions"
        :headers="['block', 'date', 'time', 'hash', 'from', 'to', 'amount', 'fee', 'memo']"
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
    this.getData(this.fullEndpoint); //fetch the block data on creating component
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
      this.dataLoading = true; //turn on loading spinner
      const response = await fetchData(endpoint, this.signal);
      
      // if error returned, redirect to "page not found"
      if (response.error) {
        this.$router.replace('/*') 
      }

      this.overviewData = response;
      this.dataLoading = false; //turn off loading spinner
      this.dataLoaded = true;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.id);
    }
  },
  components: {
    TableWrapper,
    Loader
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
  height: 1rem;
  padding: 3px;
  border-radius: 5px;
}

.clipboard-icon:hover {
  fill: var(--xi-orange);
  cursor: pointer;
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