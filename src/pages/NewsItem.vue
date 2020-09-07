<template>
    <q-page class="container row justify-center">
      <q-card class="news-card">
          <news-item />
      </q-card>
    </q-page>
</template>

<script>
import config from 'src/config.js'
export default {
    components: {
        NewsItem: () => import('src/components/NewsItem'),
    },
    meta() {
        return {
            title: this.$store.getters['news/newsItem'].subject,
        }
    },

    breadcrumb() {
        return {
            title: this.$store.getters['news/newsItem'].subject,
            parent: {
                title: 'Новости',
                path: "/news",
                parent: "/" 
            }
        }
    },
    data() {
        return {
        }
    },
    async preFetch ({store, redirect, currentRoute: { params } } ) {
        await store.dispatch('news/loadNewsItem', params.id);
        if (store.state.neterror)
            redirect(  "/404" )
    },
}
</script>

<style lang="scss">

.news-card{
    max-width: 744px;
}

</style>

