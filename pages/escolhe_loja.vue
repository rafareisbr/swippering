<!--/api/v1/estabelecimentos/?type=b-->

<template>
  <div>
    <v-btn
      v-for="estabelecimento of estabelecimentos"
      :key="estabelecimento.id"
      @click="escolherEstabelecimento(estabelecimento.id)"
    >
      {{ estabelecimento.nome }}
    </v-btn>
  </div>
</template>

<script>

export default {
  components: {},
  filters: {},
  data () {
    return {
      estabelecimentos: []
    }
  },
  created () {
    this.$axios.$get('https://pibibox.com.br/api/v1/estabelecimentos/?type=b/')
      .then((response) => {
        for (const estab of response) {
          const newEstab = {
            id: estab.usuario.id,
            nome: estab.razao_social
          }
          this.estabelecimentos.push(newEstab)
        }
        // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        // mostrar notificação
      })
  },
  methods: {
    escolherEstabelecimento (id) {
      const jaExiste = this.$cookies.get('estabelecimento_id')
      if (jaExiste) {
        this.$cookies.remove('estabelecimento_id')
      }
      this.$cookies.set('estabelecimento_id', id)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
