export default ({
  state: () => ({
    notificacoes: []
  }),
  mutations: {
    PUSH (state, notificacao) {
      state.notificacoes.push(notificacao)
    }
  },
  actions: {
    push ({ commit }, notificacao) {
      commit('PUSH', notificacao)
    }
  },
  getters: {}
})
