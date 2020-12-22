<template>
  <div
    v-if="loading || fetchError"
    class="tw-h-screen tw-text-white tw-bg-red-600 tw-flex tw-justify-center tw-items-center tw-text-4xl"
  >
    <Loading />
  </div>
  <div v-else>
    <div class="fill-height">
      <v-app-bar app color="grey lighten-4" dense flat>
        <v-btn icon light @click="onClickVoltar()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="font-g">
          {{ estabelecimento.nm_fantasia }}
        </v-toolbar-title>

        <div></div>
      </v-app-bar>

      <div class="fill-height">
        <v-card class="fill-height">
          <v-img
            :src="produto.foto || 'https://picsum.photos/667/150?random'"
            class="align-end"
            height="150px"
          />
          <v-card-text>
            <div class="mb-4 font-g font-strong">
              {{ produto ? produto.nome : '' }}
            </div>
            <p class="mb-4 font-m">
              {{ produto ? produto.descricao : '' }}
            </p>
            <div v-if="produto && produto.valor_original && produto.valor_atual" class="mb-9">
              <div
                v-if="produto.valor_original !== produto.valor_atual"
                class="mr-2 font-s d-flex justify-space-between full-width"
              >
                <div class="font-m font-weak" style="text-decoration: line-through">
                  De
                  <span class="font-g font-strong">R${{ produto.valor_original.toFixed(2) }}</span>
                </div>
                <div>
                  Por:
                  <span class="font-g" style="color: green;">
                    R$
                    <span class="font-g font-strong">{{ produto.valor_atual.toFixed(2) }}</span>
                  </span>
                </div>
              </div>
              <div v-else>
                <div class="font-weak" style="text-align: right;">
                  Valor:
                  <span class="font-g font-regular" style="color: green;">
                    R$
                    <span class="font-g font-strong">{{ produto.valor_atual.toFixed(2) }}</span>
                  </span>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'

export default {
  filters: {
    preco: (value) => {
      if (!value) {
        return '-'
      }
      return value.toFixed(2)
    }
  },
  components: {
    Loading
  },
  transition: 'slide-left',
  data: () => {
    return {
      quantidade: 1,
      itens: [],
      observacao: ''
    }
  },
  computed: {
    ...mapGetters({
      estabelecimento: 'estabelecimento/estabelecimento',
      categorias: 'estabelecimento/categorias',
      loading: 'estabelecimento/loading',
      fetchError: 'estabelecimento/fetchError'
    }),
    produto () {
      let _produto = null
      this.categorias.forEach((categoria) => {
        categoria.produtos.forEach((produto) => {
          if (produto.id === this.$route.params.id) {
            _produto = produto
          }
        })
      })
      return _produto
    },
    precoItems () {
      let _total = 0

      this.itens.forEach((item) => {
        _total += item.item.valor * item.quantidade
      })

      return _total
    },
    precoTotalProdutoEItems () {
      if (this.produto) {
        return this.produto.valor_atual + this.precoItems
      }
      return 0.0
    },
    precoTotalProdutoEItemsMultiplicado () {
      if (this.produto) {
        return this.precoTotalProdutoEItems * this.quantidade
      }
      return 0.0
    }
  },
  created () {
    this.organizaItemsDoProdutoEncontrado(this.produto)
  },
  methods: {
    addProdutoToCarrinho () {
      const _produto = {
        produto: this.produto,
        precoTotalItems: this.precoItems,
        precoTotalProdutoEItems: this.precoTotalProdutoEItems,
        itens: this.itens,
        quantidade: this.quantidade,
        observacao: this.observacao
      }
      this.$store.dispatch('carrinho/addItemToCarrinho', _produto)
      this.$router.push({
        path: '/'
      })
    },
    organizaItemsDoProdutoEncontrado (produto) {
      if (produto && produto.itens.length > 0) {
        this.itens = produto.itens.map((item) => {
          return { item, quantidade: 0 }
        })
      }
    },
    onClickVoltar () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .produto__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }

  .btn-add-carrinho {
    background-color: $vermelho-forte !important;
  }

  .btn-plus {
    border-radius: 100px !important;
  }
</style>
