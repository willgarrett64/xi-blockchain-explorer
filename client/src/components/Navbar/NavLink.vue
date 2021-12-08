<template>
  <li>
    <router-link :to="to">{{name.toUpperCase()}}</router-link>    
  </li>
</template>

<script>


export default {
  name: "NavLink",
  props: ["name", "id", "to"],
};
</script>

<style>
.nav-links li {
  padding: 0 20px;
}

.nav-links li.current {
  background-color: white;
}

.nav-links li.current a {
  color: var(--xi-blue);
}


.nav-links a {
  line-height: 100%;
  color: white;
  text-decoration: none;
}

.nav-links li:hover a {
  color: lightgrey;
  text-decoration: none;
}
</style>
