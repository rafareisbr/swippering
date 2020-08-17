<template>
  <NuxtLink
    style="text-decoration: none"
    :to="{ name: 'menu-id', params: { id: destaque.id } }"
  >
    <div style="position: relative;">
      <v-card class="card">
        <div class="card-image">
          <v-img
            src="https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2018/07/23/brigadeiro-vegano.jpg"
            aspect-ratio="2.4"
          />
        </div>
        <div
          v-if="destaque && destaque.valor_original && destaque.valor_atual"
          class="content"
        >
          <div class="font-gg font-strong pb-2">
            {{ destaque.nome }}
          </div>
          <div
            v-if="destaque.valor_atual !== destaque.valor_original"
            class="valores"
          >
            <div class="font-m font-weak" style="text-decoration: line-through">
              De R${{ destaque.valor_original.toFixed(2) }}
            </div>
            <div>
              Por
              <span
                class="font-gg"
                style="color: green;"
              >R${{ destaque.valor_atual.toFixed(2) }}</span>
            </div>
          </div>
          <div v-else class="valores">
            <div class="font-weak">
              Valor:
              <span
                class="font-gg font-regular"
                style="color: green;"
              >R${{ destaque.valor_atual.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </v-card>
      <div class="card-seta">
        <span class="material-icons">
          keyboard_arrow_right
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    destaque: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  border-radius: 0.8rem;
  margin-right: 15px;
  width: 20em;
  height: 13.3em;
}

.content {
  padding: 0.5rem;
}

.valores {
  display: flex;
  justify-content: space-between;
}

.card-seta {
  position: absolute;
  bottom: 30%;
  right: 0rem;
  height: 48px;
  width: 48px;
  background-color: $vermelho-forte;
  color: $vermelho-fraco;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
</style>
