<template>
  <div>
    <v-app-bar app dense flat color="grey lighten-4">
      <v-btn icon @click="voltar()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="font-g">Sua cesta</v-toolbar-title>

      <v-spacer />

      <v-btn icon class="hidden-xs-only">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container id="content">
      <div>
        <div class="d-flex">
          <v-avatar class="mr-4" color="teal" size="48">
            <span class="white--text headline">48</span>
          </v-avatar>
          <div>
            <h3>{{ estabelecimento.nm_fantasia }}</h3>
            <nuxt-link to="/">
              <p class="font-s font-color-red-strong">
                Voltar a loja
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <v-divider class="mb-7" />

      <div class="mb-7">
        <h4 class="mb-7" style="color: #666;">Itens Adicionados</h4>

        <div
          v-for="item in produtosNoCarrinho"
          :key="item.id"
          class="mb-6"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div class="d-flex">
            <v-avatar class="mr-3" color="teal" size="48">
              <span class="white--text headline">48</span>
            </v-avatar>
            <div
              style="display: flex; flex-direction: column; flex-wrap: wrap;"
            >
              <div class="mr-2 font-strong">{{ item.produto.nome }}</div>
              <div class="font-m" style="color: green;">R$
                <span class="font-strong">{{ item.precoTotalProdutoEItems.toFixed(2) }}</span>
              </div>
            </div>
          </div>
          <div>
            <van-stepper
              :min="0"
              :max="99"
              :value="item.quantidade"
              :is-disabled="true"
              theme="round"
              @input="updateItem($event, item)"
            />
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: center">
        <v-btn
          v-if="produtosNoCarrinho.length > 0"
          class="button__adc-mais my-4"
          outlined
          @click="voltarParaAdcMaisItens"
        >
          <span>Adicionar mais itens</span>
        </v-btn>
      </div>

      <template v-if="produtosNoCarrinho.length > 0">
        <div style="color: #666; text-align: center;" class="mb-4">ou</div>

        <div style="display: flex; align-items: center; justify-content: center" class="mb-10">
          <v-btn
            class="mb-6"
            style="color: #333;"
            text
            @click="limparCesta"
          >
            Limpar Cesta
          </v-btn>
        </div>
      </template>

      <v-btn
        v-if="produtosNoCarrinho.length > 0"
        depressed
        dark
        block
        height="50"
        class="btn__carrinho"
        @click="irParaPedido"
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
            <span>CONTINUAR</span>
          </div>
          <div>R$ {{ valorTotalCarrinho }}</div>
        </v-row>
      </v-btn>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="310">
      <v-card>
        <v-card-title style="line-break: normal !important;">
          Você tem certeza?
        </v-card-title>
        <v-card-text>
          Você confirma que está removendo o item da sua cesta?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="fecharDialog">
            Não
          </v-btn>
          <v-btn text @click="removerItem">
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'cru',
  filters: {
    preco: (value) => {
      if (!value) { return '-' }
      return value.toFixed(2)
    }
  },
  computed: {
    ...mapGetters({
      estabelecimento: 'estabelecimento/estabelecimento',
      dialog: 'carrinho/dialog',
      produtosNoCarrinho: 'carrinho/produtos_selecionados',
      valorTotalCarrinho: 'carrinho/valorTotalCarrinho'
    })
  },
  created () {
    this.$store.dispatch('carrinho/fecharDialog')
  },
  methods: {
    voltar () {
      this.$router.push('/')
    },
    irParaPedido () {
      this.$router.push({
        path: '/pedido'
      })
    },
    lookupQuantidade (id) {
      return this.$store.getters['carrinho/getItemById'](id).quantidade
    },
    updateItem (event, item) {
      const quantidade = parseInt(event)
      this.$store.dispatch('carrinho/updateItemFromCarrinho', {
        quantidade,
        item
      })
    },
    removerItem () {
      this.$store.dispatch('carrinho/removeItemFromCarrinho')
    },
    fecharDialog () {
      this.$store.dispatch('carrinho/fecharDialog')
    },
    limparCesta () {
      this.$store.dispatch('carrinho/limparCesta')
    },
    voltarParaAdcMaisItens () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.button__adc-mais {
  border: 2px solid $vermelho-forte !important;
  color: $vermelho-forte !important;
}
.btn__carrinho {
  background-color: $vermelho-forte !important;
}
</style>
