<template>
    <div>
        <news-list :items="carnews" newsitemRouteName="car-newsitem" />
    </div>
</template>

<script>
export default {
    components: {
        NewsList: () => import('src/components/NewsList'),
    },

    meta () {
        return {
                title: this.$store.state.curCarData.modelname + " - Новости",
        }
    },
    
    breadcrumb: () => ({ title: "Новости" }),

    data() {
        return {
        }
    },

    computed: {
        carnews(){
            return this.$store.getters['news/carNews'];
        },
    },

    methods: {
        pageChanged(page)
        {
        }
    },

    async preFetch ({ store, redirect, currentRoute: { params } }) {
        await store.dispatch('news/loadCarNews', { curCar: params.car } );
        if (store.state.neterror)
            redirect( {name: "404" } )
    }

}
</script>


<style scoped>

</style>
