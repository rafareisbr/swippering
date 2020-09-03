<template>
  <div class="fill-height">
    <v-app-bar app dense flat color="grey lighten-4">
      <v-btn light icon @click="onClickVoltar()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="font-g">
        {{ estabelecimento.nm_fantasia }}
      </v-toolbar-title>

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
            class="mb-9"
          >
            <div
              v-if="produto.valor_original !== produto.valor_atual"
              class="font-s mr-2 d-flex justify-space-between full-width"
            >
              <div class="font-m font-weak" style="text-decoration: line-through">
                De <span class="font-g font-strong">R${{ produto.valor_original.toFixed(2) }}</span>
              </div>
              <div>
                Por:
                <span class="font-g" style="color: green;">
                  R$ <span class="font-g font-strong">{{ produto.valor_atual.toFixed(2) }}</span>
                </span>
              </div>
            </div>
            <div v-else>
              <div class="font-weak" style="text-align: right;">
                Valor:
                <span class="font-g font-regular" style="color: green;">
                  R$ <span class="font-g font-strong">{{ produto.valor_atual.toFixed(2) }}</span>
                </span>
              </div>
            </div>
          </div>

          <div v-if="itens && itens.length > 0">

            <v-divider class="mb-7" />

            <h3 class="mb-4">
              Itens:
            </h3>

            <div v-for="item of itens" :key="item.item.id" class="mb-5">
              <div class="produto__item">
                <div>
                  <div>{{ item.item.nome }}</div>
                </div>
                <van-stepper
                  v-model="item.quantidade"
                  :min="0"
                  :max="item.item.limite"
                  :is-disabled="true"
                  theme="round"
                />
              </div>
            </div>
          </div>

          <v-divider class="mb-5" />

          <div class="produto__item mb-7">
            <div>
              Qual a quantidade?
            </div>
            <van-stepper
              v-model.number="quantidade"
              :min="1"
              :max="99"
              theme="round"
            />
          </div>

          <div>
            <div class="mb-2">
              Alguma Observação?
            </div>
            <v-textarea
              v-model="observacao"
              solo
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
                <div>R${{ precoTotalProdutoEItemsMultiplicado | preco }}</div>
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
    precoItems () {
      let _total = 0

      this.itens.forEach((item) => {
        _total += item.item.valor * item.quantidade
      })

      return _total
    },
    precoTotalProdutoEItems () {
      if (this.produto) {
        return (
          this.produto.valor_atual + this.precoItems
        )
      }
      return 0.0
    },
    precoTotalProdutoEItemsMultiplicado () {
      if (this.produto) {
        return (
          this.precoTotalProdutoEItems * this.quantidade
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