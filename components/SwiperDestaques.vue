<template>
  <div v-swiper:swiperDeal="swiperOption" class="swiper">
    <div class="swiper-wrapper">
      <div
        v-for="destaque of destaques"
        :key="destaque.id"
        class="swiper-slide"
      >
        <card-destaques :destaque="destaque" />
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'
import CardDestaques from '@/components/CardDestaques'

export default {
  name: 'SwiperDestaques',
  directives: {
    swiper: directive
  },
  components: {
    CardDestaques
  },
  props: {
    destaques: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 10
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper {
    padding: 1rem 0.2rem;
  }

  .swiper-slide {
    width: fit-content !important;
  }
</style>
