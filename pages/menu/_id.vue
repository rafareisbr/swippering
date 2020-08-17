<template>
  <div class="fill-height">
    <v-app-bar app dense flat color="grey lighten-4">
      <v-btn light icon @click="onClickVoltar()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>{{ estabelecimento.nm_fantasia }}</v-toolbar-title>

      <v-spacer />

      <v-btn icon class="hidden-xs-only">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="fill-height">
      <v-card class="fill-height">
        <v-img
          src="https://picsum.photos/667/150?random"
          class="align-end"
          height="150px"
        />

        <v-card-text>
          <div class="font-g font-strong mb-4">
            {{ produto ? produto.nome : '' }}
          </div>
          <p class="font-m mb-4">
            {{ produto ? produto.descricao : '' }}
          </p>

          <div
            v-if="produto && produto.valor_original && produto.valor_atual"
            class="mb-4"
          >
            <div
              v-if="produto.valor_original !== produto.valor_atual"
              class="font-s mr-2 d-flex justify-space-between full-width"
            >
              <div class="font-m font-weak" style="text-decoration: line-through">
                De R${{ produto.valor_original.toFixed(2) }}
              </div>
              <div>
                Por:
                <span class="font-g" style="color: green;">
                  R${{ produto.valor_atual.toFixed(2) }}</span>
              </div>
            </div>
            <div v-else>
              <div class="font-weak" style="text-align: right;">
                Valor:
                <span class="font-g font-regular" style="color: green;">
                  R${{ produto.valor_atual.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div v-if="itens && itens.length > 0">
            <v-divider class="mb-3" />
            <h3>Itens:</h3>
            <div v-for="item of itens" :key="item.item.id" class="mb-5">
              <div class="produto__item">
                <div>{{ item.item.nome }}</div>
                <vs-input-number
                  v-model="item.quantidade"
                  class="mb-3"
                  min="0"
                  color="danger"
                  :max="item.item.limite"
                  :is-disabled="true"
                />
              </div>
            </div>
          </div>

          <v-divider class="mb-4" />

          <div class="produto__item">
            <div class="mb-2">
              Qual a quantidade?
            </div>

            <vs-input-number
              v-model="quantidade"
              class="mb-3"
              min="1"
              max="50"
              color="danger"
              :is-disabled="true"
            />
          </div>

          <v-divider class="mb-4" />

          <div>
            <div class="mb-2">
              Alguma Observação?
            </div>
            <v-textarea
              v-model="observacao"
              outlined
              rows="3"
              placeholder="Informe aqui"
            />
          </div>

          <div>
            <v-btn
              class="btn-add-carrinho"
              block
              dark
              @click="addProdutoToCarrinho()"
            >
              <v-row
                class="px-2 font-weight-light"
                align="center"
                justify="space-between"
              >
                <div>
                  <v-icon size="12">
                    fas fa-shopping-basket
                  </v-icon>
                  <span>ADICIONAR À CESTA</span>
                </div>
                <div>R${{ precoTotalProduto | preco }}</div>
              </v-row>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  filters: {
    preco: (value) => {
      if (!value) { return '-' }
      return value.toFixed(2)
    }
  },
  components: {},
  layout: 'cru',
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
      categorias: 'estabelecimento/categorias'
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
    precoTotalItems () {
      let _total = 0

      this.itens.forEach((item) => {
        _total += item.item.valor * item.quantidade
      })

      return _total
    },
    precoTotalProduto () {
      if (this.produto) {
        return (
          this.quantidade * (this.produto.valor_atual + this.precoTotalItems)
        )
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
        precoTotalItems: this.precoTotalItems,
        precoTotalProduto: this.precoTotalProduto,
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
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.btn-add-carrinho {
  background-color: $vermelho-forte !important;
}
</style>
