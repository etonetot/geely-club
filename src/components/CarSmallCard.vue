<template>
    <q-card class="car-card">
        <router-link :to="'/' + car.href + '/photo'">
        <q-img class="car-image" :src="logo">
            <div v-if="car.price1" class="car-price">
                <span>От {{ car.price1*1000 | currency }} руб.</span>
            </div>
            <div v-else-if="car.status=='rusplan'" class="car-price">
                <span>Скоро в России !</span>
            </div>
        </q-img>
        </router-link>

        <q-card-section class="row justify-between items-center">
        <router-link :to="'/' + car.href" class="text-primary car-title">{{car.modelname}}</router-link>

        <q-btn round color="primary" icon="menu">
            <q-menu content-class="bg-menu">
            <q-list dense>
                <q-item clickable v-close-popup
                v-for="(button, i) in carMenu" :key="i"
                :to="'/' + car.href + button.href"
                >
                    <q-item-section>{{button.title}}</q-item-section>
                </q-item>
            </q-list>
            </q-menu>
        </q-btn>
        </q-card-section>

    </q-card>
</template>

<script>
import config from "src/config.js";

export default {
  name: "CarSmallCard",

  components: {
  },

  data() {
    return {
    };
  },
  props: {
      car: Object
  },

  computed: {
    logo() {
      return this.$store.getters["cars/getLogo"](this.car);
    },

    carMenu() {
      return this.$store.getters["carMenu"].filter(menuitem =>
        menuitem.show(this.car)
      );
    }
  },

};
</script>

<style lang="sass" scoped>

.car-title 
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;

.car-card 
  width: 240px;
  margin: 10px 20px 10px 0;
  border-radius: 5px;

.car-image 
  width: 240px;
  height: 160px;
  border-radius: 5px 5px 0px 0px;
  position: relative;
  transition: 0.3s all;  

.car-image:hover 
  filter: brightness(120%);  

.car-price 
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 0.9em;
  color: white;
  padding: 3px 8px;
  border-radius: 0px 5px 0px 7px;
  transition: 0.3s all;  

.car-image:hover .car-price
  background-color: rgba(200, 50, 50, 0.9);

.q-card__section
  padding: 10px;   

@media (max-width: 1024px) 
    .catalog-card 
        box-shadow: none;
    

 


</style>
