<template>
  <tr>
    <th>{{ header.name.toUpperCase() }}</th>
    <td v-if="to">
      <router-link :to="to">{{ data }}</router-link>
    </td>
    <td v-else>{{ data }}</td>
  </tr>
</template>

<script>

export default {
  name: "TableRowVertical",
  props: ['header', 'data', 'to'],
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.data);
    }
  },
  components: {
  }
}
</script>

<style>
.td-clipboard {
  display: flex;
  justify-content: left;
  align-items: center;
}

.td-clipboard a {
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>