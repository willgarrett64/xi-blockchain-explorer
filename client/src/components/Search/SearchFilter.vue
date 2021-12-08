<template>
  <select name="" id="" class="search-filter">
    <option value="block-height">Block Height</option>
    <option value="block-hash">Block Hash</option>
    <option value="transaction-hash">TX Hash</option>
    <option value="wallet-address">Wallet Address</option>    
  </select>
</template>

<script>


export default {
  name: "SearchFilter",
  data() { return {
    
  }},
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
