<template>
  <nav class="navbar">
    <router-link to="/">
      <img 
        v-on:click="toggleBurgerMenu"
        :src="require(`@/assets/images/xi-logo.jpg`)" 
        alt="xi logo" 
        class="logo-img"
      />
    </router-link>
    <img 
      v-on:click="toggleBurgerMenu"
      :src="require(`@/assets/images/menu-icon.svg`)" 
      alt="menu button" 
      class="menu-icon"
    />
    <div class="nav-links">
      <ul>
        <NavLink
          v-for="link in links"
          :key="link.id"
          :name="link.name"
          :to="link.to"
        />
      </ul>
    </div>
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
  },
  methods: {
    toggleBurgerMenu() {
      document.querySelector('.nav-links').classList.toggle('open');
    }
  }
};
</script>

<style>
.navbar {
  position: fixed;
  z-index: 30;
  background-color: var(--xi-blue);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  width: 100%;
}

.navbar .logo-img {
  height: 8vh;
}

.menu-icon {
  margin-right: 30px;
  display: none;
}

.nav-links {
  background-color: var(--xi-blue);
}

.nav-links ul {
  display: flex;
  list-style: none;
}

/* Uncollapse burger menu for larger screens */
@media screen and (max-width: 900px) {
  .menu-icon {
    display: block;
    height: 4vh;
    width: 4vh;
  }

  .menu-icon:hover {
    cursor: pointer;
  }

  .nav-links {
    position: fixed;
    z-index: 100;
    top: 8vh;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 0vw;
    height: 0vw;
    transition: 0.8s;
    overflow: hidden;
    background-color: var(--xi-blue);
  }

  .nav-links.open {
    width: 100vw;
    height: 92vh;
  }

  .nav-links ul {
    position: absolute;
    flex-direction: column;
    top: 0;
    right: 0;
    height: 92vh;
    width: 100vw;
    list-style: none;
  }
}

</style>
