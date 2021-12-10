<template>
  <div class="table-wrapper">
    <h3>{{ tableHeader }}</h3>
    <Table 
      :headers="headers"
      :tableData="tableData"
      :type="type"
    />
  </div>
</template>

<script>
import Table from './Table.vue';

export default {
  name: "TableWrapper",
  props: ['tableHeader', 'headers', 'tableData', 'type'],
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
}
</style>