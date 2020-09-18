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
      />
    </div>
  </div>
</template>

<script>
import CardProduto from '../components/CardProduto'

export default {
  components: {
    CardProduto
  },
  props: {
    categorias: {
      type: Array,
      default: () => []
    },
    estabelecimentoAberto: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
