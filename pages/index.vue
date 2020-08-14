<template>
  <div>
    <div v-show="!isIntersecting">
      <v-slide-y-transition hide-on-leave>
        <swiper-categorias :style="{ position: 'fixed', top: 0, left: 0, right: 0 }" :categorias="categorias" />
      </v-slide-y-transition>
    </div>

    <v-row
      justify="center"
      align="center"
      no-gutters
    >
      <v-col>
        <v-img
          src="https://picsum.photos/667/150?random"
          aspect-ratio="1.7"
          height="150px"
          cover
        />
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="mt-n10"
    >
      <v-col>
        <v-card class="card-menu">
          <v-card-text>
            <div>
              <swiper-categorias id="categorias" v-intersect="onIntersect" :categorias="categorias" />
            </div>

            <!-- produtos -->
            <div class="produtos">
              <swiper-vertical-categorias :categorias="categorias" />
            </div>
            <!-- /produtos -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

import { mapGetters } from 'vuex'
import SwiperCategorias from '@/components/SwiperCategorias'
import SwiperVerticalCategorias from '@/components/SwiperVerticalCategorias'

export default {
  directives: {
    swiper: directive
  },
  components: {
    SwiperCategorias,
    SwiperVerticalCategorias
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
      categorias: 'estabelecimento/categorias'
    })
  },
  methods: {
    onIntersect (entries) {
      this.isIntersecting = entries[0].isIntersecting
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-menu {
    border-top-left-radius: 1.5em !important;
    border-top-right-radius: 1.5em !important;
  }

  .swiper {
    height: 300px;
    width: 100%;

    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
</style>
