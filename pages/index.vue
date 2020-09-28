<template>
  <div
    v-if="loading || fetchError"
    class="tw-h-screen tw-text-white tw-bg-red-600 tw-flex tw-justify-center tw-items-center tw-text-4xl"
  >
    <div style="height: 100vh; width: 100vw">Carregando</div>
  </div>
  <div v-else>
    <div v-scroll="onScroll">
      <v-sheet
        v-show="showSubbar"
        :style="{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#ddd'
        }"
        class="py-2 mx-auto"
      >
        <v-slide-group
          prev-icon="mdi-minus"
          next-icon="mdi-plus"
          :show-arrows="false">

          <v-slide-item
            v-for="categoria in categorias"
            :key="categoria.id"
            v-slot:default="{ active }"
          >
            <v-btn
              :input-value="active"
              active-class="red white--text"
              class="mx-2"
              depressed
              rounded
              @click="selecionaCategoria(categoria.nome)"
            >
              {{ categoria.nome }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <v-app-bar v-show="!showSubbar" color="primary" dark dense fixed>
        <v-toolbar-title
          style="display: flex; justify-content: center; align-items: center;"
        >
          <img
            height="30px"
            src="~/assets/images/LOGO_APP_PIBIBOX.png"
            width="30px"
          >
        </v-toolbar-title>
      </v-app-bar>

      <v-img
        aspect-ratio="1.7"
        class="mt-12"
        cover
        height="150px"
        :src="estabelecimento.cardapio_imagem || 'https://pibibox-imagens-bkt.s3.amazonaws.com/static/produto/3d66d446-9cbb-4a7c-a183-66a7ba22ec2c.jpeg' || estabelecimento.cardapio_imagem"
      />

      <v-card class="relative pt-5 mt-n10 card-menu" style="min-height: 90vh; height: 100%;">
        <v-card-text>
          <v-avatar color="white" size="100" style="border: 2px solid white; display: block; margin-top: -100px; margin-left: auto; margin-right: auto;">
            <img
              :src="estabelecimento.logomarca || 'https://pibibox-imagens-bkt.s3.amazonaws.com/static/produto/3d66d446-9cbb-4a7c-a183-66a7ba22ec2c.jpeg'"
              style="height: 100%; width: 100%; object-fit: cover;"
              class="white--text headline"
            >
          </v-avatar>
          <div>
            <div
              style="display: flex; justify-content: space-between; align-items: center;"
            >
              <div class="flex-shrink-0">
                <h2>{{ estabelecimento.nm_fantasia }}</h2>
                <p>{{ estabelecimento.bio }}</p>
              </div>

              <div class="justify-around d-flex align-center">
                <v-rating
                  :half-increments="true"
                  :value="5"
                  background-color="indigo lighten-3"
                  color="yellow"
                  length="1"
                />
                <span class="font-g" style="font-weight: bold;">{{
                  estabelecimento.nota_avaliacoes | nota
                }}</span>
              </div>
            </div>

            <div
              style="margin-top: 1rem; margin-bottom: .25rem; display: flex; justify-content: space-between; align-items: center;"
            >
              <!--            <div class="inline-block">100% Online</div>-->
              <div
                v-if="
                  estabelecimento.funcionamento_hoje &&
                    estabelecimento.funcionamento_hoje.length > 0
                "
              >
                Aberto Agora
              </div>
              <template v-else>
                <div>
                  <v-icon>location_on</v-icon>
                  Fechado Agora
                </div>
              </template>
            </div>

            <div
              style="display: flex; justify-content: space-between; align-items: center;"
            >
              <div>
                <v-icon>airport_shuttle</v-icon>
                R${{ estabelecimento.min_taxa_entrega }} - R${{
                  estabelecimento.max_taxa_entrega
                }}
              </div>
              <v-menu
                v-if="
                  estabelecimento.funcionamento_hoje &&
                    estabelecimento.funcionamento_hoje.length > 0
                "
                bottom
                class="inline-block"
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on">
                    <div style="display: flex;">
                      <div>
                        {{
                          estabelecimento.funcionamento_hoje[0].hr_inicial
                            | horario
                        }}
                        às
                        {{
                          estabelecimento.funcionamento_hoje[0].hr_final
                            | horario
                        }}
                      </div>
                      <v-icon>expand_more</v-icon>
                    </div>
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(funcionamento, i) in estabelecimento.funcionamentos"
                    :key="i"
                  >
                    <v-list-item-title>
                      <div
                        style="display: flex; justify-content: space-between; align-items: center;"
                      >
                        <div class="mr-5">
                          {{ funcionamento.dia }}
                        </div>
                        <div>
                          {{ funcionamento.hr_inicial | horario }} às
                          {{ funcionamento.hr_final | horario }}
                        </div>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>

          <v-divider class="my-4" />

          <swiper-categorias :categorias="categorias" />

          <div v-if="destaques && destaques.length > 0" class="my-5 destaques">
            <div class="font-g font-regular">
              Em destaque
            </div>
            <swiper-destaques :destaques="destaques"
                              :estabelecimento-aberto="estabelecimentoAberto" />
          </div>

          <!-- produtos -->
          <div ref="scrollTarget" class="produtos">
            <swiper-vertical-categorias v-if="categorias && categorias.length > 0"
                                        :categorias="categorias"
                                        :estabelecimento-aberto="estabelecimentoAberto" />
            <div v-else>Nenhum produto encontrado</div>
          </div>
        </v-card-text>
      </v-card>

      <v-btn
        v-if="produtosNoCarrinho.length > 0"
        bottom
        class="btn__carrinho"
        color="primary"
        dark
        fixed
        height="40"
        :left="true"
        @click="navegarParaCesta()"
      >
        <v-row
          align="center"
          class="px-2 font-weight-light"
          justify="space-between"
        >
          <div>
            <v-icon size="12">
              fas fa-shopping-basket
            </v-icon>
            <span>MINHA CESTA</span>
          </div>
          <div>R${{ valorTotalCarrinho }}</div>
        </v-row>
      </v-btn>
    </div>
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
      if (!value) {
        return '-'
      }
      return `${moment.utc(value, 'HH:mm:ss').format('HH:mm')}hrs`
    },
    nota: (value) => {
      if (!value) {
        return '-'
      }
      return value.toFixed(1)
    },
    preco: (value) => {
      if (!value) {
        return '-'
      }
      return value.toFixed(2)
    }
  },
  data () {
    return {
      showSubbar: false,
      options: {
        duration: 300,
        offset: 50,
        easing: 'easeInCubic'
      }
    }
  },
  created () {
    const estabelecimentoId = this.$cookies.get('estabelecimento_id')

    if (!estabelecimentoId) {
      return this.$router.push('/escolhe_loja')
    }

    this.$store.dispatch('estabelecimento/fetchEstabelecimentoCategorias')
  },
  computed: {
    ...mapGetters({
      categorias: 'estabelecimento/categorias',
      estabelecimento: 'estabelecimento/estabelecimento',
      destaques: 'estabelecimento/destaques',
      loading: 'estabelecimento/loading',
      fetchError: 'estabelecimento/fetchError',
      produtosNoCarrinho: 'carrinho/produtos_selecionados',
      valorTotalCarrinho: 'carrinho/valorTotalCarrinho'
    }),
    estabelecimentoAberto () {
      return Boolean(this.estabelecimento.funcionamento_hoje &&
        this.estabelecimento.funcionamento_hoje.length > 0)
    }
  },
  methods: {
    onScroll (e) {
      // console.log(e.target.scrollingElement.scrollTop)
      // se for uma div não precisa entrar no $el, senão $refs.scrolltarget.$el.offsetTop
      // console.log(this.$refs.scrollTarget.offsetTop)
      if (
        e.target.scrollingElement.scrollTop > this.$refs.scrollTarget.offsetTop
      ) {
        if (!this.showSubbar) {
          this.showSubbar = true
        }
      } else if (this.showSubbar) {
        this.showSubbar = false
      }
    },
    navegarParaCesta () {
      this.$router.push({
        path: '/cesta'
      })
    },
    selecionaCategoria (categoriaNome) {
      const semEspacos = categoriaNome.replace(/ /g, '')
      this.$vuetify.goTo(`#${semEspacos}`, this.options)
    }
  }
}
</script>

<style scoped>
  .card-menu {
    border-top-left-radius: 1.5em !important;
    border-top-right-radius: 1.5em !important;
  }

  .btn__carrinho {
    width: calc(100% - 2rem) !important;
    z-index: 5;
  }
</style>
