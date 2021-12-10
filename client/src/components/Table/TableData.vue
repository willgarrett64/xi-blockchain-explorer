<template>
  <td v-if="to" :data-label="header + ':'">
    <router-link :to="to">{{ data }}</router-link>
  </td>
  <td v-else :data-label="header + ':'">
    {{ data }}
  </td>
</template>

<script>
export default {
  name: "TableData",
  props: ['data', 'to', 'header'],
}
</script>

<style>

</style>