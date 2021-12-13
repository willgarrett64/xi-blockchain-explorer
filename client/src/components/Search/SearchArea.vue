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
  height: 6vh;
  top: 8vh;
  background-color: var(--xi-orange);
  background-image: url('../../assets/images/banner.jpg');
  background-size: contain;
  background-repeat: repeat;
}

.search-area h1 {
  font-size: 1.5rem;
}
</style>
