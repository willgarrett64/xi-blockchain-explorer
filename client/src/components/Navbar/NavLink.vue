<template>
  <li class="nav-link" v-on:click="toggleBurgerMenu">
    <router-link :to="to" :exact="exact">
      {{name.toUpperCase()}}
    </router-link>    
  </li>
</template>

<script>


export default {
  name: "NavLink",
  props: ["name", "id", "to"],
  computed: {
    exact() {
      return this.name === 'home' && true 
      // exact is set on the home ('/') router-link so that the class 'router-link-active' class isn't applied to it for all routes
      // https://router.vuejs.org/api/#exact
    }
  },
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

.nav-link .router-link-active {
  background-color: var(--xi-orange);
}

.nav-link .router-link-active:hover {
  color: var(--xi-blue);
}

@media screen and (max-width: 900px) {
  .nav-link {
    width: 100%;
    height: 100px;
    border-top: solid 1px var(--xi-very-light-blue);
    border-bottom: solid 1px var(--xi-very-light-blue);
  }
}

</style>
