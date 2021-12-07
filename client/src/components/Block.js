export default {
  template: '<div><p>This is the {{ $route.params.height }} BLOCK page</p><p v-for="transaction in block.transactions"> {{transaction.to}} </p></div>',
  data() {
    return {
      block: {},
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    async getData() {
      try {
        let response = await fetch(`https://xi.test.network/blocks/${this.$route.params.height}`);
        this.block = await response.json();
        console.log(this.block);
      } catch (error) {
        console.log(error);
      }
    },
  }
}