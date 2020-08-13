<template>
<!--  <div v-swiper:swiperDeal="swiperOption" class="swiper">-->
<!--    <div class="swiper-wrapper">-->
<!--      <div-->
<!--        v-for="categoria of categorias"-->
<!--        :key="categoria.id"-->
<!--        class="swiper-slide"-->
<!--      >-->
<!--        <v-chip @click="selecionaCategoria(categoria.nome)">-->
<!--          {{ categoria.nome }}-->
<!--        </v-chip>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

  <v-slide-group>
    <v-slide-item
      v-for="categoria of categorias"
      :key="categoria.id"
      v-slot:default="{ active, toggle }"
    >
      <v-btn
        class="mx-2"
        :input-value="active"
        active-class="purple white--text"
        depressed
        rounded
        @click="selecionaCategoria(categoria.nome)"
      >
        {{ categoria.nome }}
      </v-btn>
    </v-slide-item>
  </v-slide-group>
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
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20
      }
    }
  },
  methods: {
    selecionaCategoria(categoriaNome) {
      const semEspacos = categoriaNome.replace(/ /g, '')
      this.$emit('clicked', `#${semEspacos}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: fit-content !important;
}
.v-chip {
  border: 1px solid $vermelho-forte;
  background-color: #fff !important;
  color: $vermelho-forte !important;
}

.v-chip-active {
  color: $vermelho-fraco !important;
  background-color: $vermelho-forte !important;
}
</style>
