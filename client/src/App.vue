<template>
  <div id="app">
    <Navbar />
    <SearchArea />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar.vue';
import SearchArea from './components/Search/SearchArea.vue';

export default {
  name: "App",
  components: {
    Navbar,
    SearchArea
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}

:root {
  --xi-blue: rgb(37, 67, 119);
  --xi-light-blue: rgb(63, 99, 161);
  --xi-very-light-blue: rgb(128, 156, 204);
}
</style>
