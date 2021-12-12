<template>
  <div class="table-wrapper">
    <h3 class="section-header">{{ tableHeader }}</h3>
    <Table 
      :headers="headers"
      :tableData="tableData"
      :type="type"
    />
    <TablePageButtons v-if="page" :page="page" :lastPage="lastPage" />
  </div>
</template>

<script>
import Table from "./Table.vue";
import TablePageButtons from "./TablePageButtons.vue";

export default {
  name: "TableWrapper",
  props: ["tableHeader", "headers", "tableData", "type", "page", "lastPage"],
  data() {
    return {
      
    }
  },
  components: {
    Table,
    TablePageButtons
  }
}
</script>

<style>
.table-wrapper {
  width: 100%;
}
</style>