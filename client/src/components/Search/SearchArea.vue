<template>
  <div class="search-area">
    <h1>XI Blockchain Explorer</h1>
    <SearchBarWrapper />
  </div>
</template>

<script>
import SearchBarWrapper from "./SearchBarWrapper.vue";

export default {
  name: "SearchArea",
  data() { return {
    
  }},
  components: {
    SearchBarWrapper,
  }
};
</script>

<style>
.search-area {
  position: relative;
  height: 10vh;
  background-color: var(--xi-orange);
}

.search-area h1 {
  font-size: 1.5rem;
}
</style>
