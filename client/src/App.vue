<template>
  <div id="app">
    <header>
      <Navbar />
      <SearchArea /> 
    </header>
    <main>
      <h2 class="page-header">XI Blockchain Explorer</h2>
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
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Saira+Condensed:wght@300;400;600&display=swap');

#app {
  font-family: 'Red Hat Text', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}

html {
  width: 100vw;
  background-color: rgb(216, 224, 238);
  overflow-x: hidden;
}

:root {
  --xi-blue: rgb(37, 67, 119);
  --xi-light-blue: rgb(63, 99, 161);
  --xi-very-light-blue: rgb(128, 156, 204);
  --xi-dark-orange: rgb(255, 115, 0);
  --xi-orange: rgb(255, 153, 0);
  --xi-light-orange: rgb(255, 191, 14);
}

header {
  width: 100vw;
}

main {
  box-sizing: border-box;
  padding: 14vh 5vw;
  overflow: hidden;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  font-size: 2rem;
  margin-bottom: 20px;
}

.section-header {
  text-align: left;
  margin-bottom: 10px;
}
</style>
