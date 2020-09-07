<template>
    <div>
        <div class="q-mb-md text-center"> 
            Модельный год:
            <span v-if="years.length<=1">{{years[0]}}</span>
            <q-btn-dropdown v-if="years.length>1" class="glossy" color="primary" :label="curYear" content-class="bg-menu">
                <q-list class="years">
                    <q-item clickable v-close-popup v-for="item in years" :key="item" :to="curYearLink(item)">
                    <q-item-section>
                        <q-item-label>{{ item }}</q-item-label>
                    </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </div>    
        
        <hscroll-table class="" :cols="columns" :rows="rows"></hscroll-table>
    </div>
</template>


<script>
import config from "src/config.js";

export default {
  components: {
    HscrollTable: () => import("src/components/PropsTable")
    //HscrollTable: () => import("vue-hscroll-table")
  },

  meta() {
    return {
      title: this.$store.getters["curCarData"].modelname + " - Характеристики и цены"
    };
  },

  breadcrumb: () => ({ title: "Характеристики и цены" }),

  data() {
    return {};
  },

  computed: {
    columns() {
      return this.$store.state.props.cols;
    },
    rows() {
      return this.$store.state.props.rows;
    },
    curCar() {
        return this.$route.params.car;
    },
    years() {
      return this.$store.getters['curCarData'].years 
    },
    curYear() {
      if (this.$route.params.year) {
        if (this.years.includes(this.$route.params.year))
          return this.$route.params.year;
      }
      return this.years ? this.years[0] : 0;
    }
  },

  methods: {
    curYearLink(year) {
      return (
        "/" +
        config.urlVendor +
        this.$route.params.car +
        "/props/" +
        (year ? year : "")
      );
    }
  },

    async preFetch ({ store, redirect, currentRoute: { params } }) {
        await store.dispatch('props/load', {
            curCar: params.car,
            year: params.year
        });
        if (store.state.neterror)
            redirect( {name: "404" } )
    }
};
</script>


<style>

.years {
    z-index: 20;
}

</style>
