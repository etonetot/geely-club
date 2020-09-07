<template>
    <div>
        <div v-if="crash" class="q-pa-md">
            <div class="row">
                <q-img class="main_car roundborder" :src="crashDir+crash.img_car" />
                <div class="q-ma-sm">
                    <div class="q-my-sm">
                        <q-rating v-model="crash.stars_count" :max="crash.stars_count>5 ? 6 : 5" size="3em" color="yellow"
                            icon="star_border" icon-selected="star" icon-half="star_half" readonly 
                        />
                    </div>
                    <div>Общая оценка: {{crash.score_total | tofixed(0) }} {{strPoints}} ({{starsCount}})</div>
                </div>
            </div>

            <crash-section-title :title="crash.titleF100" :help="crash.helpF100" />
            <crash-section 
                :score="crash.score_front100" :lim="crash.limF100"
                :img_car="crash.img_f100_car" :img_f="crash.img_f100_f" :img_r="crash.img_f100_r"
                :title_f="crash.title_f" :title_r="crash.title_r"
            />

            <crash-section-title :title="crash.titleF40" :help="crash.helpF40" />
            <crash-section 
                :score="crash.score_front40" :lim="crash.limF40"
                :img_car="crash.img_f40_car" :img_f="crash.img_f40_f" :img_r="crash.img_f40_r"
                :title_f="crash.title_f" :title_r="crash.title_r"
            />

            <crash-section-title :title="crash.titleSide" :help="crash.helpSide" />
            <crash-section 
                :score="crash.score_side" :lim="crash.limSide"
                :img_car="crash.img_side_car" :img_f="crash.img_side_f" :img_r="crash.img_side_r"
                :title_f="crash.title_f" :title_r="crash.title_r"
            />

            <crash-section-title :title="crash.titleRear" :help="crash.helpRear"  />
            <crash-section 
                :score="crash.score_rear" :lim="crash.limR"
                :img_car="crash.img_rear_car" :img_f="crash.img_rear" :title_f="crash.title_f" 
            />

            <template v-if="crash.version>=2018">   
                <crash-section-title :title="crash.titleDop" :help="crash.helpBonus"  />
                    <h3>{{crash.titleDop1}}: {{crash.score_bonus_front_reminder}} из {{crash.limDop1}}</h3>
                    <h3>{{crash.titleDop2}}: {{crash.score_bonus_back_reminder}} из {{crash.limDop2}}</h3>
                    <h3>{{crash.titleDop3}}: {{crash.score_bonus_curtain}} из {{crash.limDop3}}</h3>

                <crash-section-title :title="crash.titlePed" :help="crash.helpPed"  />
                <crash-section 
                    :score="crash.score_pedestrian" :lim="crash.limPed"
                    :img_car="crash.img_ped" :img_f="crash.img_ped_hood"
                />

                <crash-section-title :title="crash.titleActive" :help="crash.helpActive"  />
                <crash-section 
                    :score="crash.score_active" :lim="crash.limActive"
                    :img_car="crash.img_active" 
                />

            </template>

            <br>
            <div class="row"><div class="sample mark5" />Отлично</div>
            <div class="row"><div class="sample mark4" />Хорошо</div>
            <div class="row"><div class="sample mark3" />Удовлетворительно</div>
            <div class="row"><div class="sample mark2" />Плохо</div>


        </div>
        <div v-else class="text-center q-pt-md q-pb-xl">
            Информация не найдена
        </div>
    </div>
</template>

<script>
import config from "src/config.js";
import * as utils from "src/utils/utils.js";
import CrashSection from "src/components/CrashSection";
import CrashSectionTitle from "src/components/CrashSectionTitle";
export default {
    components: {
        CrashSection, CrashSectionTitle
    },

    meta () {
        return {
            title: this.$store.state.curCarData.modelname + " - Краш-тест",
        }
    },

    breadcrumb: () => ({ title: "Краш-тест" }),

    data() {
        return {
        }
    },

    computed: {
        crash(){
            return this.$store.getters['crash/crash'];
        },

        crashDir() {
            return config.imageServer + this.$store.state.curCarData.photodir + "/crash/";
        },

        starsCount() {
            return (this.crash.stars_count>5 ? "5+" : this.crash.stars_count) + " " + 
                utils.decOfNum(Math.floor(this.crash.stars_count), ['звезда', 'звезды', 'звезд'])
        },

        strPoints () {
            if (this.crash.szPoints==="%") 
                return "%"
            else
                return utils.decOfNum(this.crash.score_total.toFixed(0), ['балл', 'балла', 'баллов'])    
        }
    },

    methods: {
        pageChanged(page)
        {
        }
    },

    mounted() {
    },

    async preFetch ({ store, redirect, currentRoute: { params } }) {
        await store.dispatch('crash/load', { curCar: params.car } );
        if (store.state.neterror)
            redirect( {name: "404" } )
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

.main_car
    width: 300px

.sample 
    width: 20px
    height: 20px
    margin: 0 10px 10px 0

.mark5
    background-color: #72BF44

.mark4
    background-color: #FFF200

.mark3
    background-color: #F7941D

.mark2
    background-color: #ED1C24

h3
    font-size: 1.2em
    font-weight: bold
    margin: 0 0 5px 20px
    line-height: 20px

</style>
