<template>
  <button
    @click="$emit('click-event')"
    class="search-button"
  >
    <img :src="require(`@/assets/images/search-icon.svg`)"  alt="search icon" class="search-icon" />
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

.search-icon {
  height: 60%;
}
</style>
