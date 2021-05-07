<template>
  <div class="w-100">

    <app-slider/>

    <h1>index</h1>


    sada

    dsa
  </div>
</template>

<script>
import AppSlider from "../components/app-slider";
export default {
  components: {AppSlider},
  scrollToTop: true,
  // loading: true,
  data() {
    return {

    }
  },
  head () {
    return {
      // title: this.$store.state.settings.meta_title,
      // meta: [
      //   { hid: 'description', name: 'description', content: this.$store.state.settings.meta_description },
      //   { hid: 'keywords', name: 'keywords', content: this.$store.state.settings.meta_keywords },
      //   { property: 'og:title', content: this.$store.state.settings.meta_title },
      //   { property: 'og:description', content: this.$store.state.settings.meta_description },
      //   { property: 'og:url', content: 'http://localhost:3001' },
      // ]
    }
  },
  async asyncData ({ params, query, app }) {
    // let {data} = await app.$api.restGet('/pub/product/list', {
    //   page: 1,
    //   limit: 15
    // })
    //
    return {

    }
  },
  mounted() {
    console.log(process.env.BASE_URL)
  }
}
</script>

<style lang="scss">


</style>
