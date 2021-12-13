<template>
  <tr>
    <TableData 
      v-for="header in headers"
      :key="header.key"
      :data="item[header.key].data"
      :to="item[header.key].to"
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