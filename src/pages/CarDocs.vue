<template>
  <div class="row wrap doc-page">
    <div class="row col-sm-6 col-xs-12 justify-center">
      <q-tree
        default-expand-all
        nodeKey="id"
        tick-strategy="leaf"
        :nodes="chapters"
        :ticked.sync="treeSelected"
      />
    </div>
    <!-- <q-separator vertical class="gt-sm" />  -->
    <div class="row col-sm-6 col-xs-12 justify-center">
      <q-list>
        <transition-group name="list-complete">
          <q-item
            v-for="(item, ind) in docsVisible"
            :key="item.id"
            :class="{odd : ind%2==0}"
            class="list-complete-item"
            :to="item.id.toString()"
            append
          >
            <q-item-section avatar>
              <q-avatar color="teal" text-color="white">{{ item.docname[0] }}</q-avatar>
            </q-item-section>
            <q-item-section>
              <span class>{{ item.docname }}</span>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  meta() {
    return {
      title: this.$store.state.curCarData.modelname + " - Документация"
    };
  },

  breadcrumb() {
    return {
      title: "Документация"
    };
  },

  data() {
    return {
      treeSelected: []
    };
  },

  computed: {
    chapters() {
      return this.$store.state.doc.chapters;
    },
    docs() {
      return this.$store.state.doc.docs;
    },
    docsVisible() {
      return this.docs.filter(
        item =>
          this.treeSelected.includes(item.chapter1) ||
          this.treeSelected.includes(item.chapter2) ||
          this.treeSelected.includes(item.chapter3)
      );
    }
  },

  methods: {},

  created() {
    this.treeSelected = this.$store.state.doc.arrAllChapters;
  },

  async preFetch({ store, redirect, currentRoute: { params } }) {
    await store.dispatch("doc/load", { curCar: params.car });
    if (store.state.neterror)
        redirect( {name: "404" } )
  }
};
</script>


<style>

.doc-page {
    padding-bottom: 20px;
}

.odd {
  background-color: #eee;
}

/* Transition */
.list-complete-move,
.list-complete-item {
  transition: all 0.2s;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
