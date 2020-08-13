<template>
  <v-slide-group>
    <v-slide-item
      class="my-4 mr-4"
      v-for="destaque of destaques"
      :key="destaque.id"
      v-slot:default="{ active, toggle }"
    >
      <card-destaques :destaque="destaque"></card-destaques>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

import CardDestaques from '@/components/menu/CardDestaques'
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
  data() {
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
