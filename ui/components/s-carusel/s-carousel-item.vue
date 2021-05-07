<template>
  <div class="s-carousel-item">
    <a :href="item.link" >
      <img :src="item.image.url" :alt="item.title" :title="item.title">
    </a>
  </div>
</template>

<script>
export default {
  name: "s-carousel-item",
  props: {
    item: null,
    index: null,
  },
  methods: {

  }
}
</script>

<style lang="scss">

.s-carousel-item {
  width: 100%;
  min-width: 100%;
  img  {
    width: 100%;
  }
}

</style>
