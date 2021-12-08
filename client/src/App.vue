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
  margin-top: 60px;
}
</style>
