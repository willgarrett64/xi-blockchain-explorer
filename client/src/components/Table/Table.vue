<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers"
        :key="header">{{header}}</th>
      </tr>
    </thead>
    <tbody>
      <TableRow 
        v-for="item in tableData"
        :key="item.hash"
        :item="item"
        :headers="headers"
      />
    </tbody>
  </table>
</template>

<script>
import TableRow from './TableRow.vue';

export default {
  name: "Table",
  props: ['headers', 'tableData'],
  data() {
    return {
      
    }
  },
  components: {
    TableRow
  }
}
</script>

<style>

</style>