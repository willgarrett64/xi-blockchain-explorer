<template>
  <nav>
    <router-link to="/">
      <p>LOGO</p>
    </router-link>
    <ul>
      <NavLink 
        v-for="link in links"
        :key="link.id"
        :name="link.name"
        :to="link.to"
      />
    </ul>
  </nav>
</template>

<script>
import NavLink from "./NavLink.vue"

export default {
  name: "Navbar",
  data() { return {
    links: [
      {
        id: "home-nav-link",
        name: "home",
        to: "/"
      },
      {
        id: "blocks-nav-link",
        name: "blocks",
        to: "/blocks"
      },
      {
        id: "transactions-nav-link",
        name: "transactions",
        to: "/transactions"
      },
      {
        id: "wallets-nav-link",
        name: "wallets",
        to: "/wallets"
      },
    ]
  }},
  components: {
    NavLink
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
