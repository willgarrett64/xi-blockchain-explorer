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
    <svg 
      v-on:click="toggleBurgerMenu"
      alt="menu button" 
      class="menu-icon"
      version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 230 230" style="enable-background:new 0 0 230 230;" xml:space="preserve"><g id="XMLID_104_"><path id="XMLID_105_" d="M95,70h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H95c-8.284,0-15,6.716-15,15S86.716,70,95,70z"/><path id="XMLID_106_" d="M215,100H95c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S223.284,100,215,100z"/><path id="XMLID_107_" d="M215,160H95c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S223.284,160,215,160z"/><path id="XMLID_108_" d="M15,160c-3.95,0-7.811,1.6-10.61,4.39C1.6,167.19,0,171.05,0,175c0,3.95,1.6,7.81,4.39,10.61 C7.189,188.4,11.05,190,15,190s7.81-1.6,10.609-4.39C28.399,182.81,30,178.95,30,175c0-3.95-1.601-7.81-4.391-10.61 C22.81,161.6,18.95,160,15,160z"/> <path id="XMLID_109_" d="M15,100c-3.95,0-7.811,1.6-10.61,4.39C1.6,107.19,0,111.05,0,115c0,3.95,1.6,7.81,4.39,10.61 C7.189,128.4,11.05,130,15,130s7.81-1.6,10.609-4.39C28.399,122.81,30,118.95,30,115c0-3.95-1.601-7.81-4.391-10.61 C22.81,101.6,18.95,100,15,100z"/> <path id="XMLID_110_" d="M15,40c-3.95,0-7.811,1.6-10.61,4.39C1.6,47.19,0,51.05,0,55c0,3.95,1.6,7.81,4.39,10.61 C7.189,68.4,11.05,70,15,70s7.81-1.6,10.609-4.39C28.399,62.81,30,58.95,30,55c0-3.95-1.601-7.81-4.391-10.61 C22.81,41.6,18.95,40,15,40z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>

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
      document.querySelector('.menu-icon').classList.toggle('open');
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
  overflow:hidden
}

.navbar .logo-img {
  height: 8vh;
}

.navbar .logo-img:hover {
  height: 9vh
}

.menu-icon {
  margin-right: 30px;
  display: none;
  fill: white;
}

.menu-icon.open {
  fill: var(--xi-orange);
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
