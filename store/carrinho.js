import * as uuid from 'uuid'

function itemById (state, itemID) {
  return state.produtos_selecionados.find(item => item.id === itemID)
}

export default {
  state: () => ({
    dialog: false,
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
        commit('SET_ITEM_A_REMOVER', item)
        return commit('SHOW_DIALOG')
      } else {
        return commit('UPDATE_ITEM_CARRINHO', {
          quantidade,
          item
        })
      }
    },
    removeItemFromCarrinho ({ state, commit }) {
      commit('REMOVE_ITEM_CARRINHO', state.item_a_remover.id)
      commit('HIDE_DIALOG')
      commit('SET_ITEM_A_REMOVER', null)
    },
    limparCesta ({ commit }) {
      commit('LIMPAR_CESTA')
    },
    fecharDialog ({ commit }) {
      commit('HIDE_DIALOG')
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
    REMOVE_ITEM_CARRINHO (state, id) {
      state.produtos_selecionados = state.produtos_selecionados.filter(
        item => item.id !== id
      )
    },
    LIMPAR_CESTA (state) {
      state.produtos_selecionados = []
    },
    SHOW_DIALOG (state) {
      state.dialog = true
    },
    HIDE_DIALOG (state) {
      state.dialog = false
    },
    SET_ITEM_A_REMOVER (state, item) {
      state.item_a_remover = item
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
    dialog (state) {
      return state.dialog
    }
  }
}
