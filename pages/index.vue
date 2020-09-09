<template>
  <div class="tw-h-screen tw-text-white tw-bg-red-600 tw-flex tw-justify-center tw-items-center tw-text-4xl" v-if="loading || fetchError">
    <div>Carregando</div>
  </div>
  <div v-else>

    <div v-scroll="onScroll">
      <v-sheet
        v-show="showSubbar"
        class="py-2 mx-auto"
        :style="{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: '#ddd'
        }"
      >
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="categoria in categorias"
            :key="categoria.id"
            v-slot:default="{ active }"
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

      <v-app-bar v-show="!showSubbar" dense color="primary" dark fixed>
        <v-toolbar-title
          style="display: flex; justify-content: center; align-items: center;"
        >
          <img
            src="~/assets/images/LOGO_APP_PIBIBOX.png"
            height="30px"
            width="30px"
          />
        </v-toolbar-title>
      </v-app-bar>

      <v-img
        class="mt-12"
        src="https://picsum.photos/667/150?random"
        aspect-ratio="1.7"
        height="150px"
        cover
      />

      <v-card class="relative pt-5 mt-n10 card-menu">
        <v-card-text>
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
                  :value="5"
                  background-color="indigo lighten-3"
                  color="yellow"
                  length="1"
                  :half-increments="true"
                />
                <span style="font-weight: bold;" class="font-g">{{
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
                class="inline-block"
                transition="slide-y-transition"
                bottom
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
                        <div class="mr-5">{{ funcionamento.dia }}</div>
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

          <div class="my-5 destaques">
            <div class="font-g font-regular">
              Em destaque
            </div>
            <swiper-destaques :destaques="destaques" />
          </div>

          <!-- produtos -->
          <div ref="scrollTarget" class="produtos">
            <swiper-vertical-categorias :categorias="categorias" />
          </div>
        </v-card-text>
      </v-card>

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
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import SwiperCategorias from "@/components/SwiperCategorias";
import SwiperVerticalCategorias from "@/components/SwiperVerticalCategorias";
import SwiperDestaques from "@/components/SwiperDestaques";
import multi from '@/models/multi'

export default {
  components: {
    SwiperCategorias,
    SwiperVerticalCategorias,
    SwiperDestaques
  },
  filters: {
    horario: value => {
      if (!value) {
        return "-";
      }
      return `${moment.utc(value, "HH:mm:ss").format("HH:mm")}hrs`;
    },
    nota: value => {
      if (!value) {
        return "-";
      }
      return value.toFixed(1);
    },
    preco: value => {
      if (!value) {
        return "-";
      }
      return value.toFixed(2);
    }
  },
  created() {
    if(process.browser) {
      if(window.location.href.includes(multi.EMPRESA_00.url)) {
        this.$store.dispatch("estabelecimento/fetchEstabelecimentoCategorias", multi.EMPRESA_01.id)
      }
    }
  },
  data() {
    return {
      showSubbar: false,
      options: {
        duration: 300,
        offset: 50,
        easing: "easeInCubic"
      }
    };
  },
  computed: {
    ...mapGetters({
      categorias: "estabelecimento/categorias",
      estabelecimento: "estabelecimento/estabelecimento",
      destaques: "estabelecimento/destaques",
      loading: "estabelecimento/loading",
      fetchError: "estabelecimento/fetchError",
      produtosNoCarrinho: "carrinho/produtos_selecionados",
      valorTotalCarrinho: "carrinho/valorTotalCarrinho"
    })
  },
  methods: {
    onScroll(e) {
      // console.log(e.target.scrollingElement.scrollTop)
      // se for uma div não precisa entrar no $el, senão $refs.scrolltarget.$el.offsetTop
      // console.log(this.$refs.scrollTarget.offsetTop)
      if (
        e.target.scrollingElement.scrollTop > this.$refs.scrollTarget.offsetTop
      ) {
        if (!this.showSubbar) {
          this.showSubbar = true;
        }
      } else if (this.showSubbar) {
        this.showSubbar = false;
      }
    },
    navegarParaCesta() {
      this.$router.push({
        path: "/cesta"
      });
    },
    selecionaCategoria(categoriaNome) {
      const semEspacos = categoriaNome.replace(/ /g, "");
      this.$vuetify.goTo(`#${semEspacos}`, this.options);
    }
  }
};
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
