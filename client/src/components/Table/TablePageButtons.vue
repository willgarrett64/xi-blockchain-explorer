<template>
  <div class="table-page-buttons">
    <!-- <img 
      v-on:click="changePage(-1)"
      :src="require(`@/assets/images/prev-icon.svg`)" 
      alt="previous page icon" 
      class="table-page-icon"
      id="prev-page-btn"
    /> -->
    <svg 
    v-on:click="prevEnabled && changePage(-1)"
    class="table-page-icon" id="prev-page-btn"
    version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 240.877 240.877" style="enable-background:new 0 0 240.877 240.877;" xml:space="preserve"><g><g id="First_Page"><path d="M113.983,120.483l98.564-99.671c4.704-4.752,4.704-12.439,0-17.191c-4.704-4.74-12.319-4.74-17.011,0L88.466,111.882 c-4.632,4.668-4.547,12.584,0,17.179l107.07,108.261c4.704,4.74,12.319,4.74,17.011,0c4.692-4.74,4.704-12.439,0-17.179 L113.983,120.483z"/><path d="M36.832,0c-6.641,0-12.03,5.39-12.03,12.03v216.545c0,6.641,5.39,12.03,12.03,12.03s12.03-5.39,12.03-12.03V12.03
    C48.863,5.378,43.473,0,36.832,0z"/></g><g></g><g></g><g></g><g></g><g></g><g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
    </svg>

    <p>{{ page }}</p>

    <svg 
      v-on:click="nextEnabled && changePage(1)"
      class="table-page-icon" id="next-page-btn"
      version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 240.492 240.492" style="enable-background:new 0 0 240.492 240.492;" xml:space="preserve"><g><g id="Last_Page"><path d="M45.136,3.597c-4.704-4.74-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.415,0,17.155l98.564,99.515l-98.564,99.515 c-4.704,4.74-4.704,12.415,0,17.155c4.704,4.74,12.319,4.74,17.011,0l107.058-108.092c2.587-2.587,3.621-5.919,3.356-9.468 c-0.205-2.755-1.383-5.714-3.356-7.699L45.136,3.597z"/><path d="M203.864,0c-6.641,0-12.03,5.39-12.03,12.03v216.173c0,6.641,5.39,12.03,12.03,12.03c6.641,0,12.03-5.39,12.03-12.03 V12.03C215.894,5.39,210.505,0,203.864,0z"/></g><g></g><g></g><g></g><g></g><g></g><g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
    </svg>

  </div>
</template>

<script>

export default {
  name: "TablePageButtons",
  props: ['page', 'lastPage'],
  computed: {
    prevEnabled() {
      // previous page button on click disabled when on page 1
      return !this.page || this.page == 1 ? false : true;
    },
    nextEnabled() {
      // next page button on click disabled when on final page
      return this.page == this.lastPage ? false : true;
    }
  },
  methods: {
    changePage(change) {
      const currentPage = parseInt(this.page ? this.page : 1);

      if(currentPage === 1 && change === -1) return;

      this.$router.push({path: this.$route.path, query: {page: currentPage + change}})
    }
  },
  mounted() {
    if (!this.page || this.page == 1) {
      const btn = document.getElementById('prev-page-btn');
      btn.classList.add('disabled');
    } else if (this.page == this.lastPage) {
      const btn = document.getElementById('next-page-btn');
      btn.classList.add('disabled');
    }
  }
}
</script>

<style>
  .table-page-buttons {
    display: flex;
    float: right;
    margin-top: 10px;
  }

  .table-page-buttons p {
    height: 25px;
    line-height: 25px;
    padding: 0 5px;
    background-color: var(--xi-orange);
    color: black;
    border-radius: 4px;
    margin: 0 5px;
  }

  .table-page-icon {
    background-color: var(--xi-orange);
    height: 15px;
    padding: 5px;
    border-radius: 4px;
  }

  .table-page-icon:hover {
    cursor: pointer;
    background-color: var(--xi-dark-orange);
  }

  .table-page-icon.disabled {
    opacity: 50%;
  }

  .table-page-icon.disabled:hover {
    cursor: unset;
    background-color: var(--xi-orange);
  }

</style>