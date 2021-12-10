<template>
  <tr>
    <TableData 
      v-for="header in headers"
      :key="header"
      :data="item[header].data"
      :to="item[header].to"
      :header="header"
    />
  </tr>
</template>

<script>
import TableData from "./TableData.vue"

export default {
  name: "TableRow",
  props: ['headers', 'item'],
  data() {
    return {
      
    }
  },
  components: {
    TableData
  }
}
</script>

<style>

</style>