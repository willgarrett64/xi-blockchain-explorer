<template>
  <tr >
    <td v-for="header in headers"
    :key="header">
      {{ item[header] }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: ['headers', 'item'],
  data() {
    return {
      
    }
  },
}
</script>

<style>

</style>