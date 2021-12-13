<template>
  <td v-if="to" :data-label="header.name + ':'">
    <router-link :to="to">{{ data }}</router-link>
  </td>
  <td v-else :data-label="header.name + ':'">
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