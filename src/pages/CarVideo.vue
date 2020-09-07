<template>
    <div class="video-page">
        <q-list>
            <q-expansion-item popup group="sg" v-for="(item, ind) in video" :key="item.id">
                <template v-slot:header>
                    <div class="row items-center no-wrap">
                        <div >
                            <q-img :src="mapThumb[ind]" height="100px" width="200px" contain></q-img>
                        </div>
                        <div class="videopanel">                        
                            {{item.title}}
                        </div>
                    </div>
                </template>
                <q-card class="row justify-center">
                    <q-card-section class="">
                        <iframe  width="640" height="360" :src="'https://www.youtube.com/embed/'+item.link" 
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
</template>


<script>

import config from 'src/config.js'
import axios from 'axios';

export default {
    components: {
    },

    meta () {
        return {
                title: this.$store.state.curCarData.modelname + " - Видео",
        }
    },

    breadcrumb: () => ({ title: "Видео" }),

    data() {
        return {
            mapThumb: [],
            panel: [],
        }
    },

    computed: {
        config() {
            return config;
        },
        video(){
            return this.$store.state.video.video;
        },

    },

    methods: {
    },

    async preFetch ({ store, redirect, currentRoute: { params } }) {
        await store.dispatch('video/load', { curCar: params.car } );
        if (store.state.neterror)
            redirect( {name: "404" } )
    },

    mounted () {
            for (let i=0 ; i<this.video.length ; i++)
            {
                this.mapThumb.splice(i, 1, config.imagesDir + "mqdefault.jpg");

                axios
                    .get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+this.video[i].link+"&key=AIzaSyD3dMFKCrpKTcy4dH9oRckTfVUiATm19Sk")
                    .then(request => {
                        this.mapThumb.splice(i, 1, request.data.items[0].snippet.thumbnails.high.url);
                    });

            };

    }


}
</script>


<style scoped>
.video-page{
    max-width: 800px;
    margin: 0px auto;
    padding-bottom: 20px;
}

.video-panel
{
    align-self: center;
}
</style>

