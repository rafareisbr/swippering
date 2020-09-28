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
        <v-virtual-scroll :items="categoria.produtos" :item-height="120">
          <template v-slot="{ item }">
            <card-produto
              style="margin-right: 13px;"
              :key="item.id"
              :produto="item"
              :estabelecimento-aberto="estabelecimentoAberto"
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
