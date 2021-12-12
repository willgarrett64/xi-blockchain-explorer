<template>
  <select @input="$emit('input', $event.target.value)" :value="value" class="search-filter">
    <option value="/blocks/">Block</option>
    <option value="/transactions/">Transaction</option>
    <option value="/wallets/">Wallet</option>    
  </select>
</template>

<script>


export default {
  name: "SearchFilter",
  props: ['value'],
}
</script>

<style>
.search-filter {
  box-sizing: border-box;
  background-color: var(--xi-blue);
  color: white;
  border: none;
  width: fit-content;
  margin-right: 5px;
}

.search-filter:focus {
  outline: none;
}
</style>
