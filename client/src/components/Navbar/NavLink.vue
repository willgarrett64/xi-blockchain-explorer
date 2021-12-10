<template>
  <li class="nav-link" v-on:click="toggleBurgerMenu">
    <router-link :to="to" exact-path>
      {{name.toUpperCase()}}
    </router-link>    
  </li>
</template>

<script>


export default {
  name: "NavLink",
  props: ["name", "id", "to"],
  methods: {
    toggleBurgerMenu() {
      document.querySelector('.nav-links').classList.toggle('open')
    },
  }
};
</script>

<style>
.nav-link {
  width: 150px;
  height: 8vh;
  background-color: var(--xi-light-blue);
  border-top: solid 1px var(--xi-very-light-blue);
  border-bottom: solid 1px var(--xi-very-light-blue);
  align-self: center;
  justify-self: center;
  padding: 0;
}

.nav-link a {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  width: 100%;
  height: 100%;
  color: white;
  text-decoration: none;
}

.nav-link:hover a {
  color: var(--xi-orange);
  text-decoration: none;
}

.nav-link .router-link-exact-active {
  background-color: var(--xi-orange);
}

.nav-link .router-link-exact-active:hover {
  color: var(--xi-blue);
}

@media screen and (max-width: 750px) {
  .nav-link {
    width: 100%;
    height: 100px;
  }
}

</style>
