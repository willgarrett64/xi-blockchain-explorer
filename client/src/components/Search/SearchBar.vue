<template>
  <input 
    @input="$emit('input', $event.target.value)"
    class="search-bar"
    type="text" 
    :placeholder="placeholder" 
  />
</template>

<script>


export default {
  name: "SearchBar",
  props: ['input', 'filter'],
  computed: {
    placeholder() {
      let fill = '';
      switch (this.filter) {
        case '/blocks/':
          fill = 'Block Height (e.g. 2574)';
          break;
        case '/transactions/':
          fill = 'Transaction Hash (e.g. e1aa4d3ec9feffb07bf66df6f636d1eda4e71d216f76395a9a1dc51d600c4843)';
          break;
        case '/wallets/':
          fill = 'Wallet Address (e.g. xi_08c5eCA437C5F73B42c7B94A77971d57D8301556)';
          break;
      }

      return 'Search by ' + fill;
    }
  }
}
</script>

<style>
.search-bar {
  box-sizing: border-box;
  flex-grow: 1;
  padding: 0 10px;
  border: none;
  border-radius: 8px;
  margin: 0;
  text-overflow: ellipsis;
}
</style>
