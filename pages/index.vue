<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-swiper:myDirectiveSwiper="swiperOptions" class="swiper">
        <div class="swiper-wrapper">
          <div v-for="index in 6" :key="index" class="swiper-slide">
            <span>Slide {{ index }}</span>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

export default {
  directives: {
    swiper: directive
  },
  components: {
  },
  data () {
    return {
      swiperOptions: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 300px;
  width: 100%;

  .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination {
    > .swiper-pagination-bullet {
      background-color: red;
    }
  }
}
</style>
