<template>
  <li>
    <router-link :to="to">{{name.toUpperCase()}}</router-link>    
  </li>
</template>

<script>


export default {
  name: "NavLink",
  props: ['name', 'id', 'to'],
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
