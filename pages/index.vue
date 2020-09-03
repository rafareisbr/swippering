<template>
  <div v-scroll="onScroll">

    <v-sheet
      class="mx-auto py-2"
      v-show="showSubbar" :style="{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#ddd' }"
    >

      <v-slide-group show-arrows>
        <v-slide-item
          v-for="categoria in categorias"
          :key="categoria.id"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="red white--text"
            depressed
            rounded
            @click="selecionaCategoria(categoria.nome)"
          >
            {{ categoria.nome }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>

    </v-sheet>


    <v-app-bar dense color="primary" dark fixed v-show="!showSubbar">
      <v-toolbar-title
        style="display: flex; justify-content: center; align-items: center;"
      >
        <img
          src="~/assets/images/LOGO_APP_PIBIBOX.png"
          height="30px"
          width="30px"
        >
      </v-toolbar-title>
    </v-app-bar>


    <v-img
      src="https://picsum.photos/667/150?random"
      aspect-ratio="1.7"
      height="150px"
      cover
    />


    <v-card class="mt-n10 pt-5 card-menu relative">
      <!--      <v-avatar class="absolute mx-auto top-0 left-0 right-0 bottom-0" color="teal" size="48">-->
      <!--        <span class="white&#45;&#45;text headline">48</span>-->
      <!--      </v-avatar>-->
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

        <swiper-categorias id="categorias" :categorias="categorias"/>

        <div class="destaques mb-5" ref="scrollTarget">
          <div class="font-g font-regular">
            Em destaque
          </div>
          <swiper-destaques :destaques="destaques"/>
        </div>

        <!-- produtos -->
        <div class="produtos">
          <swiper-vertical-categorias :categorias="categorias"/>
        </div>

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
            <div>R${{ valorTotalCarrinho }}</div>
          </v-row>
        </v-btn>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  import moment from 'moment'
  import {mapGetters} from 'vuex'
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
    async fetch({store}) {
      await store.dispatch('estabelecimento/fetchEstabelecimentoCategorias')
    },
    data() {
      return {
        showSubbar: false,
        options: {
          duration: 300,
          offset: 50,
          easing: 'easeInCubic'
        }
      }
    },
    computed: {
      ...mapGetters({
        categorias: 'estabelecimento/categorias',
        estabelecimento: 'estabelecimento/estabelecimento',
        destaques: 'estabelecimento/destaques',
        loading: 'estabelecimento/loading',
        produtosNoCarrinho: 'carrinho/produtos_selecionados',
        valorTotalCarrinho: 'carrinho/valorTotalCarrinho'
      })
    },
    methods: {
      onScroll(e) {
        // console.log(e.target.scrollingElement.scrollTop)
        // se for uma div não precisa entrar no $el, senão $refs.scrolltarget.$el.offsetTop
        // console.log(this.$refs.scrollTarget.offsetTop)
        if (e.target.scrollingElement.scrollTop > this.$refs.scrollTarget.offsetTop) {
          if (!this.showSubbar) {
            this.showSubbar = true
          }
        } else if (this.showSubbar) {
          this.showSubbar = false
        }
      },
      navegarParaCesta() {
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

</style>
