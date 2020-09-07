<template>
    <div class="crash_section">
        <div class="desc">Оценка: {{score/lim*100 | tofixed(0)}}% ({{score | tofixed(1) }} баллов из {{lim}})</div>
        
        <div class="row">
            <div><img class="car roundborder" :src="crashDir+img_car" ></div>
            <div v-if="img_f" class="column maneken items-center">
                <div><img :src="crashDir+img_f" ></div>
                <div>{{title_f}}</div>
            </div>
            <div v-if="img_r" class="column maneken items-center">    
                <div><img :src="crashDir+img_r"></div>
                <div>{{title_r}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "src/config.js"
export default {
    components: {
    },
    props: {
        score: Number, lim: Number,
        img_car: String, img_f: String, img_r: String,
        title_f: String, title_r: String
    },

    data() {
        return {
        }
    },

    computed: {
        crashDir() {
            return config.imageServer + this.$store.state.curCarData.photodir + "/crash/";
        }
    },
    filters: {
        tofixed: function (value, fixed=2) {
            if (!value) return ''
            return value.toFixed(fixed)
        }
    }

}
</script>


<style lang="sass" scoped>

.roundborder
    border-radius: 5px

.crash_section
    .desc
        font-size: 1.1em
        font-weight: bold
        margin-bottom: 10px
    .car 
        height: 120px
    .maneken 
        margin: 0px 10px
        font-size: 0.8em
        img
            height: 120px
            margin: 0 10px 5px 10px
        
</style>
