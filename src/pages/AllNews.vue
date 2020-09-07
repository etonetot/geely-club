<template>
    <q-page class="pagecontainer">
        <news-list :items="newsList" newsitemRouteName="newsitem" />
    </q-page>
</template>

<script>
import config from 'src/config.js'

export default {
    components: {
        NewsList: () => import('src/components/NewsList'),
    },

    meta () {
        return {
                title: 'Новости о ' + config.strVendor,
        }
    },

    // breadcrumb() {
    //     return {
    //         title: 'Новости',
    //         parent: "/"
    //     }
    // },

    data() {
        return {
        }
    },

    computed: {
        newsList(){
            return this.$store.getters['news/allNews'];
        },
        
    },

    methods: {
        pageChanged(page) {
            //this.$router.push({ name: 'allnews', params: page==1 ? undefined : { page: page } })
        }
    },

    async preFetch ({store, params}) {
        await store.dispatch('news/loadAllNews');
    },

}
</script>

<style>
</style>
