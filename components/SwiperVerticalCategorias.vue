<template>
  <div>
    <div
      v-for="categoria in categorias"
      :id="categoria.nome.replace(/ /g, '')"
      :key="categoria.nome"
      class="mb-7"
    >
      <p class="font-g mb-3">
        {{ categoria.nome }}
      </p>
      <card-produto
        v-for="produto in categoria.produtos"
        :key="produto.id"
        :produto="produto"
      ></card-produto>
    </div>
  </div>
</template>

<script>
import CardProduto from '@/components/menu/CardProduto'

export default {
  components: {
    CardProduto
  },
  props: {
    categorias: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    slideTo(element) {
      this.$scrollTo(element) // { container: '#categorias_swiper' }
    }
  }
}
</script>

<style lang="scss" scoped></style>
