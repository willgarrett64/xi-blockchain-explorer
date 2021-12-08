<template>
  <button
    class="search-button"
  >
    Q
  </button>
</template>

<script>


export default {
  name: "SearchButton",
  data() { return {
    
  }},
  components: {

  }
}
</script>

<style>
.search-button {
  height: 4vh;
  width: 4vh;
  background-color: var(--xi-blue);
  color: white; /*TEMPORARY*/
  border: none;
}

.search-button:hover {
  cursor: pointer;
  background-color: var(--xi-light-blue);
}
</style>
