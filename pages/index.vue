<template>
  <div>
    <v-row
      justify="center"
      align="center"
      no-gutters
    >
      <v-col>
        <v-img
          src="https://picsum.photos/667/150?random"
          aspect-ratio="1.7"
          height="150px"
          cover
        />
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="mt-n10"
    >
      <v-col cols="12">
        <v-card class="card-menu">
          <v-card-text>
            <v-row class="">
              <v-col>
                <div v-swiper:myDirectiveSwiper="swiperOptions" class="swiper">
                  <div class="swiper-wrapper">
                    <div v-for="index in 6" :key="index" class="swiper-slide">
                      <span>Slide {{ index }}</span>
                    </div>
                  </div>
                  <div class="swiper-pagination swiper-pagination-bullets" />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

export default {
  directives: {
    swiper: directive
  },
  components: {},
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
  .card-menu {
    border-top-left-radius: 2em !important;
    border-top-right-radius: 2em !important;
  }

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
