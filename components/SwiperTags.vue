<template>
  <div v-swiper:swiperDeal="swiperOption" class="swiper">
    <div class="swiper-wrapper">
      <div
        v-for="categoria of categorias"
        :key="categoria.id"
        class="swiper-slide"
      >
        <div class="tw-px-2 tw-py-1 tw-text-xs tw-rounded-full tw-inline-block tw-bg-red-300 tw-text-red-700">
          {{ categoria.nome }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

export default {
  name: 'SwiperCategorias',
  directives: {
    swiper: directive
  },
  props: {
    categorias: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20
      }
    }
  },
  computed: {
    options () {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInCubic'
      }
    }
  },
  methods: {
    selecionaCategoria (categoriaNome) {
      const semEspacos = categoriaNome.replace(/ /g, '')
      this.$vuetify.goTo(`#${semEspacos}`, this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper {
    height: fit-content !important;
  }

  .swiper-slide {
    width: fit-content !important;
  }

  .v-chip {
    border: 1px solid red;
    background-color: $vermelho-fraco !important;
    color: $vermelho-forte !important;
  }

  .v-chip-active {
    color: $vermelho-forte !important;
    background-color: $vermelho-forte !important;
  }
</style>
