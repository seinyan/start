<template>
  <div style="background: #13ce66">
<!--    <VueSlickCarousel v-bind="settings">-->
<!--      <div>-->
<!--        <img src="/test.webp" style="width: 100%">-->
<!--      </div>-->
<!--      <div>-->
<!--        <img src="/test.webp" style="width: 100%">-->
<!--      </div>-->
<!--      <div>-->
<!--        <img src="/test.webp" style="width: 100%">-->
<!--      </div>-->
<!--    </VueSlickCarousel>-->

    <s-carousel :items="items" :interval="3000" show_thumbs/>

  </div>
</template>

<script>
// import VueSlickCarousel from 'vue-slick-carousel'
// import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// // optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import SCarousel from "./s-carusel/s-carusel";
export default {
  name: "app-slider",
  components: {SCarousel  },

  data() {
    return {
      items: [
        {
          link: '#',
          image: {
            url: '/test.webp',
            title: '',
          }
        },
        {
          link: '#',
          image: {
            url: '/test.webp',
            title: '',
          }
        },
        {
          link: '#',
          image: {
            url: '/test.webp',
            title: '',
          }
        },
      ],
      settings: {
        "dots": true,
        "dotsClass": "slick-dots custom-dot-class",
        "edgeFriction": 0.35,
        "infinite": false,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
      }
    }
  },
}
</script>

<style scoped>

</style>
