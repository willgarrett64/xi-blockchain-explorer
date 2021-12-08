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

</style>
