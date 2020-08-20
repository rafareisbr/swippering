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
              <div v-for="itemCarrinho of produtos_selecionados" :key="itemCarrinho.id">
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
          v-model="adquirir_por"
          :items="opcoes_entrega"
          label="Vamos definir a entrega?"
          solo
          item-value="key"
          clearable
          color="secondary"
        >
          <template v-slot:item="{ item }">
            {{ item.label }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.label }}
          </template>
        </v-select>

        <template v-if="adquirir_por === 'R'">
          <v-select
            v-model="endereco_retirada"
            :items="[estabelecimento.endereco]"
            solo
            clearable
            placeholder="Escolha o endereço de retirada"
          >
            <template v-slot:item="{ item }">
              {{ item.logradouro }}
            </template>
            <template v-slot:selection="{ item }">
              {{ item.logradouro }}
            </template>
          </v-select>
        </template>

        <template v-else-if="adquirir_por === 'E'">
          <v-card class="mb-8">
            <v-card-title>Endereço de Entrega</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="entregar_em.cep"
                label="Cep"
                solo
                required
              />
              <v-text-field
                v-model="entregar_em.logradouro"
                label="Logradouro"
                solo
                required
              />
              <v-text-field
                v-model="entregar_em.complemento"
                label="Complemento"
                solo
                required
              />
              <v-text-field
                v-model="entregar_em.bairro"
                label="Bairro"
                solo
                required
              />
            </v-card-text>
          </v-card>
        </template>
      </div>

      <v-select
        v-model="pagar_com"
        :items="opcoes_pagamento"
        label="Forma de Pagamento"
        item-value="key"
        solo
        clearable
        placeholder="Escolha a opção de pagamento"
      >
        <template v-slot:item="{ item }">
          {{ item.label }}
        </template>
        <template v-slot:selection="{ item }">
          {{ item.label }}
        </template>
      </v-select>

      <template v-if="pagar_com === 'D'">
        <v-text-field
          v-model="troco_para"
          label="Troco para quanto?"
          solo
          required
          type="number"
        />
      </template>

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
        v-if="produtos_selecionados.length > 0"
        dark
        block
        height="50"
        class="btn__carrinho"
        @click="finalizarPedido"
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
import estabelecimentoService from '@/services/estabelecimento'

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
      opcoes_entrega: [
        { key: 'R', label: 'Deseja retirar na loja' },
        { key: 'E', label: 'Entregar no meu endereço' }
      ],
      opcoes_pagamento: [
        { key: 'D', label: 'Dinheiro' },
        { key: 'C', label: 'Cartão de Crédito/Débito' }
      ],
      adquirir_por: '',
      endereco_retirada: null,
      nome: '',
      telefone: '',
      pagar_com: '',
      troco_para: '',
      entregar_em: {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: ''
      },
      json: {}
    }
  },
  computed: {
    ...mapGetters({
      estabelecimento: 'estabelecimento/estabelecimento',
      dialog: 'carrinho/dialog',
      produtos_selecionados: 'carrinho/produtos_selecionados',
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
    lookupQuantidade (id) {
      return this.$store.getters['carrinho/getItemById'](id).quantidade
    },
    voltarParaAdcMaisItens () {
      this.$router.push('/')
    },
    finalizarPedido () {
      this.json = {
        estabelecimento: this.estabelecimento.id,
        cliente: {
          nome: this.nome,
          telefone: this.telefone
        },
        adquirir_por: this.adquirir_por,
        entregar_em: this.entregar_em,
        pagar_com: this.pagar_com,
        troco_para: this.troco_para,
        produtos_selecionados: this.produtos_selecionados.map((produto) => {
          return {
            id: produto.id,
            itens: produto.itens.map((item) => {
              return {
                id: item.item.id,
                quantidade: item.quantidade
              }
            }),
            quantidade: produto.quantidade,
            observacao: produto.observacao
          }
        })
      }
      estabelecimentoService.postPedido(this.json)
        .then((resposta) => {
          console.log(resposta)
        }).catch((err) => {
          console.log(err)
        })
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
