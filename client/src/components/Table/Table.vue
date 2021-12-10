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
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.8rem;
  color: black;
  border-radius: 8px;
  overflow: hidden;
}

th, tr, td {
  padding: 0.8rem;
  background-color: white;
}

th, td {
  width: 500px;
  white-space: nowrap;
}

th {
  background-color: var(--xi-blue);
  color: white;
}

td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.horizontal-table td {
  border-bottom: solid 1px var(--xi-orange);
  min-width: 30px;
  max-width: 85px;
}

.horizontal-table tr:last-child td {
    border-bottom: none;
  }
/*#endregion Horizontal table styles */


/*#region Collapse horizontal table for mobile devices */
@media only screen and (max-width: 800px) {
  .horizontal-table :is(thead, tbody, tr, th, td) {
    display: block;
  }
  
  /* Hide table headers (but not display: none;, for accessibility) */
  .horizontal-table :is(thead) {
    display: none;
  }

  .horizontal-table tr { 
    /* border-bottom: 1px solid var(--xi-orange); 
    border-top: 1px solid var(--xi-orange);  */
    margin-bottom: 8px;
    border-radius: 8px;
    padding: 0;
    overflow: hidden;
  }
	
	.horizontal-table td { 
		/* Behave  like a "row" */
		position: relative;
		border-bottom: 1px solid var(--xi-orange); 
    padding: 8px 10px;
		padding-left: 100px; 
    width: unset;
    min-width: unset;
    max-width: unset;
	}

  .horizontal-table td:last-child {
    border-bottom: none;
  }
	
	.horizontal-table td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 8px;
		left: 10px;
		white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
	}

}  
/*#endregion Collapse horizontal table for mobile devices */


/*#region Vertical table styles*/
.vertical-table {
  width: 100%;
}

.vertical-table th {
  width: 100px;
}

.vertical-table td {
  width: 100%;
  min-width: 50px;
  max-width: 100px;
  overflow: hidden;
}

/*#endregion Vertical table styles*/


</style>