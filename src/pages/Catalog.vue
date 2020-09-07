<template>
  <q-page class="pagecontainer">
    <q-card class="q-pa-sm catalog-card">


        <q-list >
            <q-expansion-item expand-separator
                v-for="(st, indSt) in notEmptyStatus" :key="st.id" 
                :default-opened="!indSt" 
            >
                 <template v-slot:header>
                     <div class="row items-center">
                         <div class="section-avatar" :class='`section-avatar-${st.id}`'></div>
                        {{st.title}}
                     </div>

                </template>
                <q-card>
                    <div class="row wrap justify-center q-mt-sm">
                        <car-small-card v-for="item in carsWithStatus(st.id, st.id2)" :key="item.id" :car ="item" />
                    </div>
                </q-card>
            </q-expansion-item>
        </q-list>

        <!-- <open-close-section 
            
            :opened="!indSt" 
            class="row justify-center q-ma-lg"
        >
            <template v-slot:label >
                  <div class="section-title">{{st.title}}</div>
            </template>

            <div class="row wrap justify-center q-mt-sm">
                <car-small-card v-for="item in carsWithStatus(st.id, st.id2)" :key="item.id" :car ="item" />
            </div>

        </open-close-section> -->

    </q-card>
  </q-page>
</template>

<script>
import config from "src/config.js";
import OpenCloseSection from "src/components/OpenCloseSection";
import CarSmallCard from "src/components/CarSmallCard";

export default {
  name: "Catalog",

  components: {
      OpenCloseSection, CarSmallCard
  },

  meta: () => {
    return { 
        title: "Модели " + config.strVendor
        }
  },

  data() {
    return {
      saleStatus: [
        { id: "rus", id2: "rusplan", title: config.strVendor + " в России" },
        { id: "rusold", title: "Ранее продавались в России" },
        { id: "", title: "Модели внутреннего рынка" },
        { id: "old", title: "Снятые с производства" },
        { id: "con", title: "Концепты" }
      ]
    };
  },

  computed: {
    cars() {
      return this.$store.getters["cars/cars"];
    },
    notEmptyStatus() {
        return this.saleStatus.filter( st => this.carsWithStatus(st.id, st.id2).length )
    }
  },

  methods: {
    load() {
      this.$store.dispatch("cars/load");
    },

    carsWithStatus(status1, status2) {
      return this.cars.filter(
        item => item.status == status1 || item.status == status2
      );
    },

  },

  async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    await store.dispatch("cars/load");
    await store.dispatch("loadRate");
  }
};
</script>

<style lang="sass" scoped>

.section-title 
    font-size: 1.2em;
    color: $primary;
    font-family: 'KomikaAxis';
    margin: 0 0 0 5px;


.section-avatar
    padding: 10px;
    border-radius: 10px;
    width: 20px;
    height: 20px;
    margin-right: 10px;

.section-avatar-rus
    background: linear-gradient(white, white, blue, red, red);

.section-avatar-rusold
    background: linear-gradient(white, white, blue, red, red);
    opacity: 0.2

.section-avatar-
    background: linear-gradient(135deg, yellow,  red, red);
  
.section-avatar-old
    background: url(/statics/stop-sign.svg)
    background-size: contain;

    #iLayer_1
        fill: green;
        color: green;
  
.section-avatar-con
    border: 1px #ccc solid


@media (max-width: 1024px) 
    .catalog-card 
        box-shadow: none;
    



 


</style>
