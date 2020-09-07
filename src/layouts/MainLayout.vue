<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="main-header">
      <toolbar class="q-mt-xs" />
      <q-linear-progress
        :color="colorLoading"
        :indeterminate="showLoading"
        :value="1"
      />
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <breadcrumbs class="breadcrumbs" />
      <router-view />

      <q-no-ssr>
        <div class="row justify-center q-mt-md">
            <liveinternet-counter />
        </div>
      </q-no-ssr>
    </q-page-container>

  </q-layout>
</template>

<script>
import config from "src/config.js";
import Breadcrumbs from "src/components/Breadcrumbs";
import Toolbar from "src/components/Toolbar";
import LiveinternetCounter from "vue-liveinternet-counter";

export default {
  name: "MainLayout",

  components: {
    Breadcrumbs,
    Toolbar,
    LiveinternetCounter
  },
  data() {
    return {
      showLoading: false,
      colorLoading: "primary"
    };
  },
  watch: {
    loading(newLoading, oldLoading) {
      if (newLoading) {
        this.colorLoading = "info";
        this.showLoading = true;
      } else {
        this.showLoading = false;
        this.timer = setTimeout(() => {
          this.colorLoading = "primary";
        }, 300);
      }
     
    },
    netError(newValue, old) {
        if (newValue)
            this.showError() 
    }
  },
  computed: {
    config() {
      return config;
    },
    loading() {
      return this.$store.state.loading;
    },
    netError() {
      return this.$store.state.netError;
    }
    // colorLoading() {
    //     return this.$store.state.loading ? "warning" : "primary"
    // }
  },
  methods: {
    showError() {
        this.$q.notify({
                caption: this.$store.state.errorText,
                message: 'Произошла ошибка',
                type: 'negative',
                icon: 'announcement',
                position: 'top',
                classes: 'glossy',
                progress: true,
            }) 
        this.$store.commit('setErrorShowed')
    }
  }
};
</script>

<style scoped>
.main-header {
  max-width: 984px;
  margin: 0 auto;
}

.breadcrumbs {
  max-width: 984px;
  padding: 20px 0 0 0px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .breadcrumbs {
    margin-left: 20px;
  }
}
</style>
