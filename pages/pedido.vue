<template>
  <div>
    <v-app-bar app color="grey lighten-4" dense flat>
      <v-btn icon @click="voltar()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="font-m font-strong">
        Seu Pedido
      </v-toolbar-title>

      <v-spacer />

      <v-btn class="hidden-xs-only" icon>
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
                  {{ valorTotalCarrinho }}
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="itemCarrinho of produtos_selecionados" :key="itemCarrinho.id">
                {{ itemCarrinho.quantidade }}x {{ itemCarrinho.produto.nome }} -
                R$
                {{
                  (itemCarrinho.precoTotalProdutoEItems * itemCarrinho.quantidade)
                    | preco
                }}
              </div>
              <br>
              <div>
                <h3>Subtotal - R$ {{ valorTotalCarrinho }}</h3>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-select
          v-model="adquirir_por"
          :items="opcoes_entrega"
          clearable
          color="secondary"
          item-value="key"
          label="Vamos definir a entrega?"
          solo
        >
          <template v-slot:item="{ item }">
            {{ item.label }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.label }}
          </template>
        </v-select>

        <template v-if="adquirir_por === 'E'">
          <v-card class="mb-8">
            <v-card-title class="font-m ">
              Endereço de Entrega
            </v-card-title>
            <v-card-text>
              <v-alert
                v-if="viaCepError"
                dense
                outlined
                dismissible
                transition="scale-transition"
                type="error"
              >
                Sinto muito! Não encontrei seu endereço com o <strong>CEP</strong> informado.
              </v-alert>

              <v-text-field
                v-model="entregar_em.cep"
                label="Cep"
                required
                solo
                @blur="buscarCep"
              />
              <v-text-field
                v-model="entregar_em.logradouro"
                label="Logradouro"
                required
                solo
              />
              <v-text-field
                v-model="entregar_em.complemento"
                label="Complemento"
                required
                solo
              />
              <v-text-field
                v-model="entregar_em.bairro"
                label="Bairro"
                required
                solo
              />
            </v-card-text>
          </v-card>
        </template>
      </div>

      <v-select
        v-model="pagar_com"
        :items="estabelecimento.metodos_pagamentos"
        clearable
        item-value="id"
        label="Forma de Pagamento"
        placeholder="Escolha a opção de pagamento"
        solo
      >
        <template v-slot:item="{ item }">
          <span>{{ item.categoria }} </span>
          <span v-if="item.bandeira !== 'Dinheiro'" style="margin-left: .5rem;">- {{ item.bandeira }}</span>
        </template>
        <template v-slot:selection="{ item }">
          <span>{{ item.categoria }} </span>
          <span v-if="item.bandeira !== 'Dinheiro'" style="margin-left: .5rem;">- {{ item.bandeira }}</span>
        </template>
      </v-select>

      <template v-if="metodoPagamentoSelecionado && metodoPagamentoSelecionado.categoria === 'Dinheiro'">
        <v-text-field
          v-model.number="troco_para"
          label="Troco para quanto?"
          required
          solo
          type="number"
        >
          <template v-slot:prepend>
            R$
          </template>
        </v-text-field>
      </template>

      <v-text-field
        v-model.trim="nome"
        label="Seu Nome"
        :error-messages="nomeErrors"
        required
        solo
        @blur="$v.nome.$touch()"
      />

      <v-text-field
        v-model.number="telefone"
        label="Número do Whatsapp"
        :error-messages="telefoneErrors"
        required
        solo
        type="number"
        @blur="$v.telefone.$touch()"
      />

      <v-btn
        v-if="produtos_selecionados.length > 0"
        block
        class="btn__carrinho"
        dark
        height="50"
        @click="finalizarPedido"
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
            <span>FINALIZAR PEDIDO</span>
          </div>
          <div>R$ {{ valorTotalCarrinho }}</div>
        </v-row>
      </v-btn>
    </v-container>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import estabelecimentoService from '@/services/estabelecimento'

export default {
  filters: {
    preco: (value) => {
      if (!value) {
        return '-'
      }
      return value.toFixed(2)
    }
  },
  data () {
    return {
      overlay: false,
      viaCepError: false,
      opcoes_entrega: [
        {
          key: 'R',
          label: 'Deseja retirar na loja'
        },
        {
          key: 'E',
          label: 'Entregar no meu endereço'
        }
      ],
      adquirir_por: '',
      endereco_retirada: null,
      nome: '',
      telefone: '',
      pagar_com: '',
      troco_para: 0.0,
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
      valorTotalCarrinho: 'carrinho/valorTotalCarrinho',
      quantidadeProdutos: 'carrinho/quantidadeProdutos'
    }),
    metodoPagamentoSelecionado() {
      if (this.pagar_com) {
        return this.estabelecimento.metodos_pagamentos.find(metodo => metodo.id === this.pagar_com);
      }
    },
    nomeErrors () {
      const errors = []
      if (!this.$v.nome.$dirty) {
        return errors
      }
      !this.$v.nome.required && errors.push('Preencha seu nome')
      return errors
    },
    telefoneErrors () {
      const errors = []
      if (!this.$v.telefone.$dirty) {
        return errors
      }
      !this.$v.telefone.required && errors.push('Preencha seu número')
      return errors
    }
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
    async buscarCep () {
      this.overlay = true
      this.viaCepError = false
      try {
        const response = await this.$axios.get('https://viacep.com.br/ws/' + this.entregar_em.cep + '/json/')
        const cep = response.data
        if (cep.erro) {
          this.viaCepError = true
        }
        this.entregar_em.logradouro = cep.logradouro
        this.entregar_em.bairro = cep.bairro
        this.entregar_em.complemento = cep.complemento
      } catch (falha) {
        this.viaCepError = true
        // eslint-disable-next-line no-console
        console.log('falha ao tentar obter essas informações')
      } finally {
        this.overlay = false
      }
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
        dt_entrega: null,
        dt_retirada: null,
        pagar_com: this.pagar_com,
        troco_para: this.troco_para,
        produtos_selecionados: this.produtos_selecionados.map((produto) => {
          return {
            id: produto.produto.id,
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
      this.overlay = true
      estabelecimentoService.postPedido(this.json)
        .then((resposta) => {
          let mensagem = `*=== Pedido ===*\n\n`
          for(let item of this.produtos_selecionados) {
            mensagem += `${item.quantidade}x - ${item.produto.nome}\n`
          }
          window.open(`https://wa.me/55${this.estabelecimento.telefone}?text=${mensagem}`, '_blank')
          this.$router.push({ path: '/pedido-realizado' })
          this.$store.dispatch('carrinho/limparCesta')
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          const notification = {
            type: 'error',
            message: 'Não consegui enviar seu pedido.'
          }
          this.$store.dispatch('notifications/push', notification)
        })
        .finally(() => {
          this.overlay = false
        })
    }
  },
  validations: {
    nome: {
      required
    },
    telefone: {
      required
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
