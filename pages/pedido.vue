<template>
  <div>
    <v-app-bar app dense flat color="grey lighten-4">
      <v-btn icon @click="voltar()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Seu Pedido</v-toolbar-title>

      <v-spacer />

      <v-btn icon class="hidden-xs-only">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <div>
        <v-expansion-panels>
          <v-expansion-panel class="resumo_pedido">
            <v-expansion-panel-header>
              <div>
                <div>Resumo do Pedido</div>
                <div>
                  {{ quantidadeProdutos }} Itens adicionados - R$
                  {{ valorTotalProdutosSelecionados }}
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="itemCarrinho of produtosNoCarrinho" :key="itemCarrinho.id">
                {{ itemCarrinho.quantidade }}x {{ itemCarrinho.produto.nome }} -
                R$
                {{
                  (itemCarrinho.precoTotalProduto * itemCarrinho.quantidade)
                    | preco
                }}
              </div>
              <br>
              <div>
                <h3>Subtotal - R$ {{ valorTotalProdutosSelecionados }}</h3>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-select
          v-model="formaEntrega"
          :items="opcoesEntrega"
          label="Vamos definir a entrega?"
          solo
          clearable
        />

        <v-card v-if="formaEntrega === opcoesEntrega[1]">
          Entrega
        </v-card>
        <v-card v-else-if="formaEntrega === opcoesEntrega[0]">
          Retirada
        </v-card>
      </div>

      <v-select
        v-model="formaPagamento"
        :items="opcoesPagamento"
        label="Forma de Pagamento"
        solo
        clearable
      />

      <v-text-field
        v-model="nome"
        label="Seu Nome"
        solo
        required
      />

      <v-text-field
        v-model="telefone"
        label="Número do Whatsapp"
        solo
        required
        type="number"
      />

      <v-btn
        v-if="produtosNoCarrinho.length > 0"
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
            <span>FINALIZAR PEDIDO</span>
          </div>
          <div>R$ {{ valorTotalProdutosSelecionados }}</div>
        </v-row>
      </v-btn>
    </v-container>
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
  data () {
    return {
      opcoesEntrega: [
        'Deseja retirar na loja',
        'Entregar no meu endereço'
      ],
      opcoesPagamento: [
        'Dinheiro',
        'Cartão de crédito',
        'Cartão de débito',
        'Boleto',
        'Transferência',
        'Vale refeição',
        'Vale alimentação'
      ],
      formaEntrega: '',
      formaPagamento: '',
      nome: '',
      telefone: ''
    }
  },
  computed: {
    ...mapGetters({
      estabelecimento: 'estabelecimento/estabelecimento',
      dialog: 'carrinho/dialog',
      produtosNoCarrinho: 'carrinho/produtos_selecionados',
      valorTotalProdutosSelecionados: 'carrinho/valorTotalProdutosSelecionados',
      quantidadeProdutos: 'carrinho/quantidadeProdutos'
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

  .resumo_pedido {
    margin-bottom: 2em;
    background-color: $vermelho-fraco !important;
    color: $vermelho-forte !important;
  }
</style>
