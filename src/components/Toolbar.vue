<template>
    <q-toolbar>
        <q-btn flat dense round icon="menu" class="lt-sm">   
            <q-menu>
                <q-list style="min-width: 100px" class="bg-menu">
                    <q-item clickable v-close-popup v-for="item in mainMenu" :key="item.title" :to="item.href">
                        <q-item-section>{{item.title}}</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>

        <q-btn flat :to="hrefroot">
            <q-img :src="getLogo()" :width="logoWidth"></q-img>
        </q-btn>

        <q-btn flat class="gt-xs" v-for="item in mainMenu" :key="item.title" :to="item.href" :label="item.title" />
        
      <!-- <v-progress-circular indeterminate color="primary" v-show="loading"></v-progress-circular> -->

        <q-space />

        <q-btn flat dense class="q-mr-sm" v-for="item in rightMenu" :key="item.title" :to="item.href" :icon="item.icon" :label="item.title" />
    
    </q-toolbar>
</template>

<script>
import config from "src/config.js";

export default {
  data() {
    return {
      mainMenuHaval: [
        { href: "/" + config.urlVendor + "f7", title: "F7" },
        { href: "/" + config.urlVendor + "f7x", title: "F7X" },
        { href: "/" + config.urlVendor + "h2", title: "H2" /*modelid:375 */ },
        { href: "/" + config.urlVendor + "h5", title: "H5" /*modelid:572 */ },
        { href: "/" + config.urlVendor + "h6", title: "H6" /*modelid:572 */ },
        { href: "/" + config.urlVendor + "h9", title: "H9" /*modelid:522 */ }
      ],
      rightMenuHaval: [
        { href: "/news" , title: "Новости", icon: "mail" },  //fa-newspaper
        { href: config.forumPage , title: "Форум", icon: "fas fa-comments" },
      ],

      mainMenuGeely: [
        { href: "/" + config.urlVendor + "atlas", title: "Atlas" },
        { href: "/" + config.urlVendor + "sx11", title   : "Coolray" },
        { href: "/" + config.urlVendor + "emgrand", title: "Emgrand 7" /*modelid:375 */ },
        { href: "/" + config.urlVendor + "emgrand-x7", title: "Emgrand X7" /*modelid:375 */ },
        { href: "/" + config.urlVendor + "emgrand-gs", title: "GS" /*modelid:572 */ }
      ],

      rightMenuGeely: [
        { href: "/news" , title: "Новости", icon: "mail" },  //fa-newspaper
      ],


      hrefroot: "/" + config.urlVendor
    };
  },

  computed: {
    config() {
      return config;
    },
    loading() {
      return this.$store.state.loading;
    },
    snackbar: {
      get: function() {
        return this.$store.state.neterror;
      },
      set: function(newValue) {
        //this.$store.commit('ERROR_SHOWED');
      }
    },
    snackbarText() {
      return this.$store.state.errorText;
    },

    mainMenu() {
        return this['mainMenu'+this.config.mainBrand]
    },

    rightMenu() {
        return this['rightMenu'+this.config.mainBrand]
    },

    logoWidth() {
          return "200px";
    //   switch (this.$q.breakpoint.name) {
    //     case "xs":
    //     case "sm":
    //       return "140px";
    //     case "md":
    //       return "180px";
    //     default:
    //       return "240px";
    //   }
    },
    showBreadCrumbs() {
      return !this.$store.state.neterror;
    }
  },
  methods:{
    getCarIcon(title) {
        return 'statics/_'+config.mainBrand.toLowerCase()+'/cars/'+title+'.gif'
    },
    getLogo() {
        return 'statics/_'+config.mainBrand.toLowerCase()+'/logo.png'
    },

  }


};
</script>


<style>
/* @import "https://use.fontawesome.com/releases/v5.1.0/css/all.css"; */

.logoBtn:hover {
  /* background-color:  !important; */
}

</style>
