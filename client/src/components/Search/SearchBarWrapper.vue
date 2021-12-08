<template>
  <div class="search-bar-wrapper">
    <SearchBar />
    <SearchButton />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import SearchButton from "./SearchButton.vue";

export default {
  name: "SearchBarWrapper",
  data() { return {
    
  }},
  components: {
    SearchBar,
    SearchButton,
  }
};
</script>

<style>
.search-bar-wrapper {
  background-color: var(--xi-blue);
  position: absolute;
  display: flex;
  height: 4vh;
  width: 70vw;
  max-width: 600px;
  bottom: 0;
  left: 50%;
  padding: 0;
  transform: translate(-50%, 50%);
  border: solid 3px var(--xi-blue);
  border-radius: 10px;
  overflow: hidden;
}
</style>
