<template>
  <div style="position: relative;">
    <NuxtLink
      :to="{ name: 'menu-id', params: { id: produto.id } }"
      style="text-decoration: none"
    >
      <div class="pb-2" style="position: relative;">
        <v-card
          style="overflow: hidden; border-top-left-radius: 1rem; border-bottom-left-radius: 1rem;"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-img
              aspect-ratio="1"
              cover
              height="100px"
              :src="produto.foto || 'https://i.pinimg.com/originals/e3/49/af/e349af2e9e68ba152da20f834cc7fa76.jpg'"
              style="overflow: hidden; border-top-left-radius: 1rem; border-bottom-left-radius: 1rem;"
              width="100px"
            />

            <v-card-text class="d-flex flex-column justify-space-between">
              <div>
                <div class="font-g font-strong">
                  {{ produto.nome }}
                </div>
                <div class="font-s font-weak">
                  {{ produto.descricao }}
                </div>
              </div>
              <div
                v-if="produto && produto.valor_original && produto.valor_atual"
              >
                <div
                  v-if="produto.valor_original !== produto.valor_atual"
                  style="font-size: 0.8rem; margin-right: 1.5rem; display: flex; justify-content: space-between; width: 100%;"
                >
                  <div
                    class="font-m font-weak"
                    style="text-decoration: line-through"
                  >
                    De R${{ produto.valor_original.toFixed(2) }}
                  </div>
                  <div>
                    Por
                    <span class="font-g" style="color: green;">
                    R${{ produto.valor_atual.toFixed(2) }}</span>
                  </div>
                </div>
                <div v-else>
                  <div class="font-weak" style="text-align: right;">
                    Valor:
                    <span class="font-g font-regular" style="color: green;">
                    R${{ produto.valor_atual.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="card-seta">
        <span class="material-icons">
          keyboard_arrow_right
        </span>
        </div>
      </div>
    </NuxtLink>

    <div v-if="!estabelecimentoAberto" style="position: absolute; top: 0; height: 100%; width: 100%; background-color: white; opacity: .5; display: flex; align-items: center; justify-content: center;"></div>

  </div>
</template>

<script>
export default {
  props: {
    produto: {
      type: Object,
      required: true
    },
    estabelecimentoAberto: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-seta {
    position: absolute;
    bottom: 42%;
    right: -0.8rem;
    height: 30px;
    width: 30px;
    background-color: $vermelho-forte;
    color: $vermelho-fraco;
    border-radius: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
