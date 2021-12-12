<template>
  <select @input="$emit('input', $event.target.value)" :value="value" class="search-filter">
    <option value="block-height">Block Height</option>
    <option value="block-hash">Block Hash</option>
    <option value="transaction-hash">TX Hash</option>
    <option value="wallet-address">Wallet Address</option>    
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
}

.search-filter:focus {
  outline: none;
}
</style>
