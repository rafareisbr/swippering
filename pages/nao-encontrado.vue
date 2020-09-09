<template>
  <div
    style="height: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center;"
  >
    <div>
      <p v-if="fetchError">
        {{ fetchError.data.detail }}
      </p>
      <nuxt-link to="/">
        <v-btn outlined>
          Voltar ao inicio
        </v-btn>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loading: 'estabelecimento/loading',
      fetchError: 'estabelecimento/fetchError'
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('estabelecimento/setError', null)
    next()
  }
}
</script>

<style scoped></style>
