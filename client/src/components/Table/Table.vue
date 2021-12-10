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
/*#region General table styles */
table {
  display: block;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.8rem;
  color: black;
}

th, tr, td {
  padding: 15px;
  background-color: white;
}

tr {
  max-width: 100%;
}

th {
  background-color: var(--xi-blue);
  color: white;
}

td {
  overflow: hidden;
  text-overflow: ellipsis;
}

td a {
  color: black;
}

td a:hover {
  color: var(--xi-dark-orange);
}



tr:hover {
  background-color: rgb(218, 218, 218);
}
/*#endregion General table styles */

/*#region Horizontal table styles */
.horizontal-table {
  width: 100%;
  overflow-x: scroll;
}

.horizontal-table td {
  border-bottom: solid 1px var(--xi-orange);
  max-width: 200px;
}
/*#endregion Horizontal table styles */


/*#region Collapse horizontal table for mobile devices */
@media only screen and (max-width: 760px) {
  .horizontal-table :is(thead, tbody, tr, th, td) {
    display: block;
    max-width: none;
  }
  
  /* Hide table headers (but not display: none;, for accessibility) */
  .horizontal-table :is(thead) {
    display: none;
  }

  .horizontal-table tr { 
    border-bottom: 1px solid var(--xi-orange); 
    border-top: 1px solid var(--xi-orange); 
  }
	
	.horizontal-table td { 
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid var(--xi-blue); 
		position: relative;
    padding: 6px 0 6px 35px;
		padding-left: 35%; 
	}
	
	.horizontal-table td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 35%; 
		padding-right: 10px; 
		white-space: nowrap;
    content: attr(data-label);
	}

}  
/*#endregion Collapse horizontal table for mobile devices */


/*#region Vertical table styles*/
.vertical-table {
  width: 100%;
}

.vertical-table tbody {
  width: 100%;
}

.vertical-table th {
  width: 20%;
}

.vertical-table td {
  width: 80%;
}
/*#endregion Vertical table styles*/


</style>