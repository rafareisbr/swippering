import * as uuid from 'uuid'

function itemById (state, itemID) {
  return state.produtos_selecionados.find(item => item.id === itemID)
}

export default {
  state: () => ({
    dialogRemoverItemCarrinho: false,
    dialogLimparCesta: true,
    item_a_remover: null,
    produtos_selecionados: [],
    cliente: {
      primeiro_nome: 'Sebastião',
      ultimo_nome: 'Dourado',
      telefone: '(62) 99654-2332'
    },
    adquirir_por: 'E',
    dt_retirada: '',
    dt_entrega: null,
    entregar_em: {
      cep: '7865292',
      bairro: 'Santa Genoveva',
      logradouro: 'Rua da Felicidade Quadra 23 Lote 11',
      complemento: ''
    },
    pagar_com: 'D',
    troco_para: 50
  }),

  actions: {
    addItemToCarrinho ({ commit }, item) {
      item.id = uuid.v4()
      commit('ADD_ITEM_CARRINHO', item)
    },
    updateItemFromCarrinho ({ commit }, { quantidade, item }) {
      if (quantidade === 0) {
        item.quantidade = 1
        commit('SET_ITEM_A_REMOVER', item)
        commit('MOSTRAR_DIALOG_REMOVER_ITEM_CARRINHO')
      } else {
        return commit('UPDATE_ITEM_CARRINHO', {
          quantidade,
          item
        })
      }
    },
    removeItemFromCarrinho ({ state, commit }) {
      commit('REMOVE_ITEM_CARRINHO', state.item_a_remover.id)
      commit('ESCONDER_DIALOG_REMOVER_ITEM_CARRINHO')
      commit('SET_ITEM_A_REMOVER', null)
    },
    fecharDialogRemoverItem ({ commit }) {
      commit('ESCONDER_DIALOG_REMOVER_ITEM_CARRINHO')
    },
    abrirDialogLimparCesta ({ commit }) {
      commit('MOSTRAR_DIALOG_LIMPAR_CESTA')
    },
    fecharDialogLimparCesta ({ commit }) {
      commit('ESCONDER_DIALOG_LIMPAR_CESTA')
    },
    limparCesta ({ commit }) {
      commit('ESCONDER_DIALOG_LIMPAR_CESTA')
      commit('LIMPAR_CESTA')
    }
  },

  mutations: {
    ADD_ITEM_CARRINHO (state, produto) {
      state.produtos_selecionados.push(produto)
    },
    UPDATE_ITEM_CARRINHO (state, { quantidade, item }) {
      const itemEncontrado = itemById(state, item.id)
      if (itemEncontrado) {
        itemEncontrado.quantidade = quantidade
      }
    },
    MOSTRAR_DIALOG_REMOVER_ITEM_CARRINHO (state) {
      state.dialogRemoverItemCarrinho = true
    },
    ESCONDER_DIALOG_REMOVER_ITEM_CARRINHO (state) {
      state.dialogRemoverItemCarrinho = false
    },
    SET_ITEM_A_REMOVER (state, item) {
      state.item_a_remover = item
    },
    REMOVE_ITEM_CARRINHO (state, id) {
      state.produtos_selecionados = state.produtos_selecionados.filter(
        item => item.id !== id
      )
    },
    MOSTRAR_DIALOG_LIMPAR_CESTA (state) {
      state.dialogLimparCesta = true
    },
    ESCONDER_DIALOG_LIMPAR_CESTA (state) {
      state.dialogLimparCesta = false
    },
    LIMPAR_CESTA (state) {
      state.produtos_selecionados = []
    }
  },

  getters: {
    produtos_selecionados (state) {
      return state.produtos_selecionados
    },
    getItemById: state => (id) => {
      return state.produtos_selecionados.find(item => item.id === id)
    },
    valorTotalCarrinho (getters) {
      let total = 0.0
      getters.produtos_selecionados.forEach((item) => {
        total +=
          parseFloat(item.precoTotalProdutoEItems) * parseFloat(item.quantidade)
      })
      return total.toFixed(2)
    },
    quantidadeProdutos (state) {
      return state.produtos_selecionados.length
    },
    dialogRemoverItemCarrinho (state) {
      return state.dialogRemoverItemCarrinho
    },
    dialogLimparCesta (state) {
      return state.dialogLimparCesta
    }
  }
}
