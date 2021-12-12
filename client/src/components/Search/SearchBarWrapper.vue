<template>
  <div class="search-bar-wrapper">
    <SearchFilter v-model="filter" />
    <SearchBar v-model="input" :filter="filter" />
    <SearchButton v-on:click-event="submitSearch" />
  </div>
</template>

<script>
import SearchFilter from "./SearchFilter.vue";
import SearchBar from "./SearchBar.vue";
import SearchButton from "./SearchButton.vue";

export default {
  name: "SearchBarWrapper",
  data() { return {
    input: '',
    filter: '/blocks/'
  }},
  methods: {
    submitSearch() {
      // reroute to page for the selected filter and search input
      this.$router.push(this.filter + this.input);
    }
  },
  components: {
    SearchFilter,
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
