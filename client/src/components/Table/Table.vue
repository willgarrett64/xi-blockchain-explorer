<template>
  <!--Horizontal tables are for arrays of data - top row is made of headers and then data object in array will form subsequent rows-->
  <table v-if="type === 'horizontal'" class="horizontal-table">
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
        :key="item.key"
        :item="item"
        :headers="headers"
      />
    </tbody>
  </table>

  <!--Vertical tables are for single data object - each row consists of a header (to left) and data (to right)-->
  <table v-else-if="type === 'vertical'" class="vertical-table">
    <tbody>
      <TableRowVertical
        v-for="header in headers"
        :key="header"
        :data="tableData[header].data"
        :to="tableData[header].to"
        :header="header"
      />
    </tbody>
  </table>
</template>

<script>
import TableRow from './TableRow.vue';
import TableRowVertical from './TableRowVertical.vue';

export default {
  name: "Table",
  props: ['headers', 'tableData', 'type'],
  data() {
    return {
      
    }
  },
  components: {
    TableRow,
    TableRowVertical
  },
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
  font-size: 0.8rem;
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