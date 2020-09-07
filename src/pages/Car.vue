<template>
    <q-page class="pagecontainer">
        <car-card :car="carData"></car-card>
        <q-card class="car-content">
			<router-view  />
        </q-card>
    </q-page>
</template>


<script>
import config from 'src/config.js'

export default {
    breadcrumb() {
        return {
            title: this.$store.state.curCarData.modelname,
            parent: "/"
        }
    },

    components: {
        CarCard: () => import('src/components/CarCard.vue'),
    },

    data() {
        return {
        }
    },

    computed: {
        carData(){
            return this.$store.getters['curCarData'];
        },

    },

    async preFetch ({store, redirect, currentRoute: { params } } ) {
        await store.dispatch('loadCarData', params.car);
        await store.dispatch('loadRate');
    },

}
</script>


<style scoped>

.car-content {
    padding: 20px 0px 0px 0px; 
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}




</style>
