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

      <template v-if="categoria.produtos.length > 0">
        <v-virtual-scroll :item-height="120" :items="categoria.produtos">
          <template v-slot="{ item }">
            <card-produto
              :key="item.id"
              :estabelecimento-aberto="estabelecimentoAberto"
              :produto="item"
              style="margin-right: 13px;"
            />
          </template>
        </v-virtual-scroll>
      </template>
      <template v-else>
        <p>Nenhum item encontrado</p>
      </template>
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
