<template>
  <div class="s-carousel" v-show="isMounted">
    <div class="s-carousel-wrapper">
      <div class="s-carousel-items" :style="{'margin-left': '-' + mp + '%' }">
        <s-carousel-item v-for="(item, index) in items" :item="item" :key="index" :index="index"/>
      </div>
    </div>

    <span class="s-carousel-button s-carousel-prev" @click="prevAction">
        <i class="fas fa-chevron-left"></i>
      </span>
    <span class="s-carousel-button s-carousel-next" @click="nextAction">
        <i class="fas fa-chevron-right"></i>
    </span>

    <div v-if="show_thumbs" class="s-carousel-mini-block">
      <div class="s-carousel-mini-items">
        <div class="s-carousel-mini-item" :class="{active: currentSliderIndex === index }"
             :style="{'background-image': get_bg_url(item.image)}"
             @click="setCurrentSliderIndex(index)" v-for="(item, index) in items" :key="index" :index="index">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SCarouselItem from "./s-carousel-item";
export default {
  name: "s-carousel",
  components: {SCarouselItem},
  data() {
    return {
      currentSliderIndex: 0,
      mp: 0,
      isMounted: false
    }
  },
  props: {
    items: null,
    interval: {
      type: Number,
      default: function () {
        return 0
      }
    },
    show_thumbs: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  methods: {
    get_bg_url(url){
      return 'url("' + url + '")'
    },
    mpCalc() {
      this.mp = (100 * this.currentSliderIndex)
    },
    prevAction() {
      if (this.currentSliderIndex > 0) {
        this.currentSliderIndex --
      }
      else {
        this.currentSliderIndex = this.items.length - 1
      }
      this.mpCalc()
    },
    nextAction() {
      console.log('== nextAction ===')
      if (this.currentSliderIndex < this.items.length - 1) {
        this.currentSliderIndex ++
      }
      else {
        this.currentSliderIndex = 0
      }
      this.mpCalc()
    },
    setCurrentSliderIndex(index){
      this.currentSliderIndex = index
      this.mpCalc()
    }
  },
  mounted() {
    if (this.interval) {
      let _this = this
      setInterval(function () {
        _this.nextAction()
      }, this.interval)
    }
  },
  created() {
    this.isMounted = true
  }
}
</script>

<style lang="scss">

$mini-item-height: 80px;
$color-blue: #131144;
$color-gray: #f8f8f8;

.s-carousel {
  width: 100%;
  position: relative;
}
.s-carousel-wrapper {
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.s-carousel-items {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  transition: all ease 900ms;
}

.s-carousel-button  {
  position: absolute;
  top: calc(50% - 25px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50px;
  width: 50px;
  i {
    color: $color-blue;
    font-size: 25px;
  }
}
.s-carousel-next {
  right: 5px;
}
.s-carousel-prev {
  left: 5px;
}


.s-carousel-mini-block {
  width: 100%;
}
.s-carousel-mini-items {
  height: $mini-item-height;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.s-carousel-mini-item {
  height: $mini-item-height;
  width: $mini-item-height;
  padding: 5px;
  border: 1px solid $color-gray;
  cursor: pointer;
  transition: all ease 900ms;
  //background-image: url("http://api.shop.cc/images/slider_item/87/87.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.s-carousel-mini-item.active {
  border: 2px solid $color-blue;
}

</style>
