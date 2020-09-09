import EstabelecimentoService from '@/services/estabelecimento'

export default {
  state: () => ({
    estabelecimento: {},
    categorias: [],
    destaques: [],
    error: null,
    loading: true
  }),

  actions: {
    fetchEstabelecimentoCategorias ({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_FETCH_ERROR', null)

      return EstabelecimentoService.getCardapio(id)
        .then((response) => {
          const dados = response.data[0]
          commit('SET_ESTABELECIMENTO', dados.estabelecimento)
          commit('SET_CATEGORIAS', dados.categorias)
          commit('SET_DESTAQUES', dados.destaques)
        })
        .catch((error) => {
          commit('SET_FETCH_ERROR', error.response)
          this.$router.push('/nao-encontrado')
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    },
    setError ({ commit }, value) {
      commit('SET_FETCH_ERROR', value)
    }
  },
  mutations: {
    SET_LOADING (state, value) {
      state.loading = value
    },
    SET_ESTABELECIMENTO (state, estabelecimento) {
      state.estabelecimento = estabelecimento
    },
    SET_CATEGORIAS (state, categorias) {
      state.categorias = categorias
    },
    SET_DESTAQUES (state, destaques) {
      state.destaques = destaques
    },
    SET_FETCH_ERROR (state, error) {
      state.error = error
    }
  },

  getters: {
    estabelecimento (state) {
      return state.estabelecimento
    },

    categorias (state) {
      return state.categorias
    },

    destaques (state) {
      return state.destaques
    },

    loading (state) {
      return state.loading
    },

    fetchError (state) {
      return state.error
    }
  }
}
