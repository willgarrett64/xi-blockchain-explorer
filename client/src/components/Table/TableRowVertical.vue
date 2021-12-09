<template>
  <tr>
    <th>{{ header }}</th>
    <td v-if="to"><router-link :to="to">{{ data }}</router-link></td>
    <td v-else>{{ data }}</td>
  </tr>
</template>

<script>
export default {
  name: "TableRowVertical",
  props: ['header', 'data', 'to'],
}
</script>

<style>

</style>