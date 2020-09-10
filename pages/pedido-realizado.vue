<template>
  <div
    class="mx-auto"
    style="background-color: rgba(255,0,22,0.05); max-height: 100vh; height: 100%; text-align: center;"
  >
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
      <v-avatar color="green" size="62" style="margin-bottom: 1.5rem;">
        <i class="fas fa-check" style="color: white" />
      </v-avatar>
      <div style="font-weight: 700">
        Seu pedido foi realizado com sucesso.
      </div>

      <p>Vamos te passar o What's App do vendedor para facilitar o contato.</p>

      <v-btn outlined @click="onClickPedirNovamente">
        Pedir Novamente
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickPedirNovamente () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
