<template>
  <div>
    <v-app-bar app dense flat color="grey lighten-4">
      <v-btn icon @click="voltar()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Sua cesta</v-toolbar-title>

      <v-spacer />

      <v-btn icon class="hidden-xs-only">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container id="content">
      <div>
        <div class="d-flex">
          <v-avatar color="teal" size="48">
            <span class="white--text headline">48</span>
          </v-avatar>
          <h2>{{ estabelecimento.nm_fantasia }}</h2>
        </div>
        <p>Voltar a loja</p>
      </div>

      <v-divider />

      <h3>Itens Adicionados</h3>
      <div
        v-for="item in produtosNoCarrinho"
        :key="item.id"
        class="mb-6"
        style="display: flex; justify-content: space-between; align-items: center;"
      >
        <div
          style="display: flex; align-items: center; justify-content: space-between;"
        >
          <div class="mr-2">
            {{ item.produto.nome }}
          </div>
          <div>{{ item.produto.preco }}</div>
        </div>
        <div>
          <vs-input-number
            :value="item.quantidade"
            :is-disabled="true"
            @input="updateItem($event, item)"
          />
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: center">
        <v-btn
          v-if="produtosNoCarrinho.length > 0"
          class="button__adc-mais mb-4"
          outlined
          @click="voltarParaAdcMaisItens"
        >
          Adicionar mais itens
        </v-btn>
      </div>
      <div style="display: flex; align-items: center; justify-content: center">
        <v-btn
          v-if="produtosNoCarrinho.length > 0"
          class="mb-6"
          text
          @click="limparCesta"
        >
          Limpar Cesta
        </v-btn>
      </div>

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
          <div>R$ {{ valorTotalProdutosSelecionados }}</div>
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
      valorTotalProdutosSelecionados: 'carrinho/valorTotalProdutosSelecionados'
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
