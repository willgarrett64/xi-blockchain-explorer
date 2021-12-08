<template>
  <nav class="navbar">
    <router-link to="/">
      <img :src="require(`@/assets/images/xi-logo.jpg`)" alt="xi logo" class="logo-img"/>
    </router-link>
    <img :src="require(`@/assets/images/menu-icon.svg`)" alt="menu button" class="menu-icon"/>
    <ul class="nav-links open">
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
.navbar {
  background-color: var(--xi-blue);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  height: 8vh;
}

.navbar .logo-img {
  height: 8vh;
}

.menu-icon {
  height: 4vh;
  width: 4vh;
}

.nav-links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 100%;
  list-style: none;
}

</style>
