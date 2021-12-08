<template>
  <div class="table-wrapper">
    <h3>{{ tableHeader }}</h3>
    <Table 
      :headers="headers"
      :tableData="tableData"
    />
  </div>
</template>

<script>
import Table from './Table.vue';

export default {
  name: "TableWrapper",
  props: ['tableHeader', 'headers', 'tableData'],
  data() {
    return {
      
    }
  },
  components: {
    Table
  }
}
</script>

<style>
.table-wrapper {
  width: 100%;
  overflow: hidden;
}
</style>