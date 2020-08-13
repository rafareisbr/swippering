import * as uuid from 'uuid'

function itemById (state, itemID) {
  return state.produtosSelecionados.find(item => item.id === itemID)
}

export default {
  state: () => ({
    dialog: false,
    item_a_remover: null,
    produtosSelecionados: [],
    cliente: {
      primeiro_nome: 'Sebastião',
      ultimo_nome: 'Dourado',
      telefone: '(62) 99654-2332'
    },
    adquirir_por: 'E',
    dt_adquirir: null,
    entregar_em: 'Rua 85 Q 23 Lt 9 Setor Marista',
    pagamento: 'D',
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
      state.produtosSelecionados.push(produto)
    },
    UPDATE_ITEM_CARRINHO (state, { quantidade, item }) {
      const itemEncontrado = itemById(state, item.id)
      if (itemEncontrado) {
        itemEncontrado.quantidade = quantidade
      }
    },
    REMOVE_ITEM_CARRINHO (state, id) {
      state.produtosSelecionados = state.produtosSelecionados.filter(
        item => item.id !== id
      )
    },
    LIMPAR_CESTA (state) {
      state.produtosSelecionados = []
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
    produtosSelecionados (state) {
      return state.produtosSelecionados
    },
    getItemById: state => (id) => {
      return state.produtosSelecionados.find(item => item.id === id)
    },
    valorTotalItemCarrinho: getters => (id) => {
      const item = getters.getItemById(id)
      return parseFloat(item.precoTotalProduto) * parseFloat(item.quantidade)
    },
    valorTotalProdutosSelecionados (getters) {
      let total = 0.0
      getters.produtosSelecionados.forEach((item) => {
        total +=
          parseFloat(item.precoTotalProduto) * parseFloat(item.quantidade)
      })
      return total.toFixed(2)
    },
    quantidadeProdutos (state) {
      return state.produtosSelecionados.length
    },
    dialog (state) {
      return state.dialog
    }
  }
}
