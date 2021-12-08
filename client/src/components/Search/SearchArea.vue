<template>
  <div class="search-area">
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
</style>
