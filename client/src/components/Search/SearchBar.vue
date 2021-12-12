<template>
  <input 
    @input="$emit('input', $event.target.value)"
    class="search-bar"
    type="text" 
    placeholder="PLACEHOLDER" 
  />
</template>

<script>


export default {
  name: "SearchBar",
  props: ['input'],
}
</script>

<style>
.search-bar {
  box-sizing: border-box;
  flex-grow: 1;
  border: none;
  margin: 0;
}
</style>
