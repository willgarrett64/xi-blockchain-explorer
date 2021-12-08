<template>
  <td v-if="to">
    <router-link :to="to">{{ data }}</router-link>
  </td>
  <td v-else>
    {{ data }}
  </td>
</template>

<script>
export default {
  name: "TableData",
  props: ['data', 'to'],
}
</script>

<style>

</style>