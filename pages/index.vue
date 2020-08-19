<template>
  <div>
    <v-toolbar app dense color="primary" dark>
      <v-toolbar-title
        style="display: flex; justify-content: center; align-items: center;"
      >
        <img
          src="~/assets/images/LOGO_APP_PIBIBOX.png"
          height="30px"
          width="30px"
        >
      </v-toolbar-title>

      <v-spacer />
    </v-toolbar>

    <v-card v-if="!isIntersecting">
      <v-card-text>
        <v-slide-y-transition hide-on-leave>
          <swiper-categorias :style="{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }" :categorias="categorias" />
        </v-slide-y-transition>
      </v-card-text>
    </v-card>

    <v-img
      src="https://picsum.photos/667/150?random"
      aspect-ratio="1.7"
      height="150px"
      cover
    />

    <v-card class="mt-n10 pt-5 card-menu">
      <v-card-text>
        <div class="nomenota">
          <p class="nomenota__nome font-g font-strong">
            {{ estabelecimento.nm_fantasia }}
          </p>
          <p class="nomenota__bio font-m">
            {{ estabelecimento.bio }}
          </p>
          <div
            class="nomenota__nota font-gg font-strong d-flex align-center justify-end"
          >
            <v-rating
              v-model="estabelecimento.nota_avaliacoes"
              background-color="indigo lighten-3"
              color="yellow"
              length="1"
              :half-increments="true"
            />
            <span>{{ estabelecimento.nota_avaliacoes | nota }}</span>
          </div>
        </div>

        <swiper-categorias id="categorias" v-intersect="onIntersect" :categorias="categorias" />

        <div class="destaques mb-5">
          <div class="font-g font-regular">
            Em destaque
          </div>
          <swiper-destaques :destaques="destaques" />
        </div>

        <!-- produtos -->
        <div class="produtos">
          <swiper-vertical-categorias :categorias="categorias" />
        </div>

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        <v-btn
          v-if="produtosNoCarrinho.length > 0"
          class="btn__carrinho"
          fixed
          bottom
          dark
          height="50"
          color="primary"
          @click="navegarParaCesta()"
        >
          <v-row
            class="px-2 font-weight-light"
            align="center"
            justify="space-between"
          >
            <div>
              <v-icon size="12">
                fas fa-shopping-basket
              </v-icon>
              <span>MINHA CESTA</span>
            </div>
            <div>R${{ valorTotalProdutosSelecionados }}</div>
          </v-row>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import SwiperCategorias from '@/components/SwiperCategorias'
import SwiperVerticalCategorias from '@/components/SwiperVerticalCategorias'
import SwiperDestaques from '@/components/SwiperDestaques'

export default {
  components: {
    SwiperCategorias,
    SwiperVerticalCategorias,
    SwiperDestaques
  },
  filters: {
    horario: (value) => {
      if (!value) { return '-' }
      return `${moment.utc(value, 'HH:mm:ss').format('HH:mm')}hrs`
    },
    nota: (value) => {
      if (!value) {
        return '-'
      }
      return value.toFixed(1)
    },
    preco: (value) => {
      if (!value) { return '-' }
      return value.toFixed(2)
    }
  },
  async fetch ({ store }) {
    await store.dispatch('estabelecimento/fetchEstabelecimentoCategorias')
  },
  data () {
    return {
      isIntersecting: false
    }
  },
  computed: {
    ...mapGetters({
      categorias: 'estabelecimento/categorias',
      estabelecimento: 'estabelecimento/estabelecimento',
      destaques: 'estabelecimento/destaques',
      loading: 'estabelecimento/loading',
      produtosNoCarrinho: 'carrinho/produtos_selecionados',
      valorTotalProdutosSelecionados: 'carrinho/valorTotalProdutosSelecionados'
    })
  },
  methods: {
    onIntersect (entries) {
      this.isIntersecting = entries[0].isIntersecting
    },
    navegarParaCesta () {
      this.$router.push({
        path: '/cesta'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-menu {
    border-top-left-radius: 1.5em !important;
    border-top-right-radius: 1.5em !important;
  }
  .btn__carrinho {
    width: calc(100% - 2rem) !important;
    z-index: 5;
  }
</style>
