<template>
  <table class="horizontal-table">
    <thead>
      <tr>
        <th 
          v-for="header in headers"
          :key="header"
        >
          {{header}}
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow 
        v-for="item in tableData"
        :key="item.hash.data"
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
.horizontal-table {
  display: block;
  width: 100%;
  overflow: scroll;
  border-collapse: collapse;
}

th, tr, td {
  padding: 15px;
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
}

td a {
  color: black;
}

td a:hover {
  color: var(--xi-dark-orange);
}

th {
  background-color: var(--xi-blue);
  color: white;
}

tr:hover {
  background-color: rgb(218, 218, 218);
}
</style>