<template>
  <div>
    <v-app-bar app color="grey lighten-4" dense flat>
      <v-btn icon @click="voltar()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="font-g">
        Sua cesta
      </v-toolbar-title>

      <v-spacer />

      <v-btn class="hidden-xs-only" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container id="content">
      <div>
        <div class="d-flex">
          <v-avatar color="white" size="48" style="margin-right: 15px">
            <img
              :src="estabelecimento.logomarca || 'https://pibibox-imagens-bkt.s3.amazonaws.com/static/produto/3d66d446-9cbb-4a7c-a183-66a7ba22ec2c.jpeg'"
              style="height: 100%; width: 100%; object-fit: cover; border: 5px solid #eaeaea"
              class="white--text headline"
            >
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
        <h4 class="mb-7" style="color: #666;">
          Itens Adicionados
        </h4>

        <div
          v-for="item in produtosNoCarrinho"
          :key="item.id"
          class="mb-6"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div class="d-flex mb-4">
            <div
              style="display: flex; flex-direction: column; flex-wrap: wrap;"
            >
              <div class="mr-2 font-strong">
                {{ item.produto.nome }}
              </div>
              <div class="font-m" style="color: green;">
                R$
                <span class="font-strong">{{
                  item.precoTotalProdutoEItems.toFixed(2)
                }}</span>
              </div>
              <div v-if="item.observacao">
                Observação: {{ item.observacao }}
              </div>
            </div>
          </div>
          <div>
            <van-stepper
              :is-disabled="true"
              :max="99"
              :min="0"
              :value="item.quantidade"
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
        <div class="mb-4" style="color: #666; text-align: center;">
          ou
        </div>

        <div
          class="mb-10"
          style="display: flex; align-items: center; justify-content: center"
        >
          <v-btn class="mb-6" style="color: #333;" text @click="abrirDialogLimparCesta">
            Limpar Cesta
          </v-btn>
        </div>
      </template>

      <v-btn
        v-if="produtosNoCarrinho.length > 0"
        block
        class="btn__carrinho"
        dark
        depressed
        height="50"
        @click="irParaPedido"
      >
        <v-row
          align="center"
          class="px-2 font-weight-light"
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

    <v-dialog v-model="dialogRemoverItemCarrinho" max-width="310" persistent>
      <v-card>
        <v-card-title style="line-break: normal !important;">
          Você tem certeza?
        </v-card-title>
        <v-card-text>
          Você confirma que está removendo o item da sua cesta?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="fecharDialogRemoverItem">
            Não
          </v-btn>
          <v-btn text @click="removerItemFromCarrinho">
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogLimparCesta" max-width="310" persistent>
      <v-card>
        <v-card-title style="line-break: normal !important;">
          Você tem certeza?
        </v-card-title>
        <v-card-text>
          Se confirmar você está tirando todos os itens da cesta.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="fecharDialogLimparCesta">
            Não
          </v-btn>
          <v-btn text @click="limparCesta">
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
  filters: {
    preco: (value) => {
      if (!value) {
        return '-'
      }
      return value.toFixed(2)
    }
  },
  computed: {
    ...mapGetters({
      estabelecimento: 'estabelecimento/estabelecimento',
      produtosNoCarrinho: 'carrinho/produtos_selecionados',
      valorTotalCarrinho: 'carrinho/valorTotalCarrinho',
      dialogRemoverItemCarrinho: 'carrinho/dialogRemoverItemCarrinho',
      dialogLimparCesta: 'carrinho/dialogLimparCesta'
    })
  },
  created () {
    this.$store.dispatch('carrinho/fecharDialogLimparCesta')
    this.$store.dispatch('carrinho/fecharDialogRemoverItem')
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
    fecharDialogRemoverItem () {
      this.$store.dispatch('carrinho/fecharDialogRemoverItem')
    },
    removerItemFromCarrinho () {
      this.$store.dispatch('carrinho/removeItemFromCarrinho')
    },
    abrirDialogLimparCesta () {
      this.$store.dispatch('carrinho/abrirDialogLimparCesta')
    },
    fecharDialogLimparCesta () {
      this.$store.dispatch('carrinho/fecharDialogLimparCesta')
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
