<template>
  <div class="doc-content">
    <h1 class>{{ doc.docname }}</h1>
    <p class v-html="doc.content"></p>
  </div>
</template>

<script>
export default {
  components: {},

  meta() {
    return {
      title: this.$store.state.doc.curDoc.docname
    };
  },

  breadcrumb() {
    return {
      title: this.$store.state.doc.curDoc.docname,
      parent: {
        path: "/" + this.$route.params.car + "/doc",
        title: "Документация"
      }
    };
  },

  data() {
    return {};
  },

  computed: {
    config() {
      return config;
    },
    doc() {
      return this.$store.state.doc.curDoc;
    }
  },

  methods: {},

  mounted() {},

  async preFetch({ store, currentRoute: { params } }) {
    await store.dispatch("doc/loadDoc", { docid: params.id });
  }
};
</script>

<style scoped>
h1 {
  margin: 0 0 20px 0;
  line-height: 2rem;
  font-size: 2em;
}

.doc-content {
  padding: 20px;
  font-size: 1.2em;
}
</style>




