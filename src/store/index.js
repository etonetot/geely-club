import Vue from 'vue'
import Vuex from 'vuex'

import cars from './cars'
import news from './news'
import props from './props'
import photos from './photos'
import sales from './sales'
import video from './video'
import crash from './crash'
import doc from './doc'

import { loadHelper } from './common'
import config from 'src/config.js';
import {PrepareReview} from 'src/prepareContent.js';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            cars,
            news,
            props,
            photos,
            sales,
            video,
            doc,
            crash
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEV,

        state: {
            curCarData: {},
            rate: 1,
            loading: false,
            netError: false,
            errorText: '',
        },

        getters: {
            curCarData: state => state.curCarData,
            rate: state => state.rate ? state.rate : 1,
            carMenu: () => [
                { name: 'props',  href:'/props', title:'Характеристики', show: () => true },
                { name: 'photo',  href:'/photo', title:'Фото' , show: () => true},
                { name: 'video',  href:'/video', title:'Видео', show: car => car.video_count },
                { name: 'doc',  href:'/doc', title:'Документация', show: car => car.doc_count },
                { name: 'news',  href:'/news', title:'Новости', show: car => car.news_count},
                { name: 'sales',  href:'/sales', title:'Продажи', show: car => car.has_sales || car.has_sales_rus},
                { name: 'crash',  href:'/crash', title:'Краш-тест', show: car => car.has_crash},
            ],



        },

        mutations: {
            setCarData: function (state, carData) {
                carData.years = carData.years ? carData.years.split(",") : [];
                carData.review2 = carData.review2 || ""; 
                PrepareReview(carData);

                state.curCarData = carData;
                if (state.curCarData === undefined)
                    this.commit('setError', "car not found");
            },

            setRate: function (state, rate) {
                state.rate = rate;
            },

            setLoading: (state, loading) => {
                state.loading = loading;
            },

            setError: (state, error) => {
                state.loading = false;
                state.netError = true;
                state.errorText = error;
                console.error("SETERROR", error);
            },

            setErrorShowed: (state) => {
                state.netError = false;
            },


        },

        actions: {

            async loadCarData(ctx, curCar) {
                await loadHelper(ctx, config.apiVendor + curCar + '/getcardata', "setCarData")
            },

            async loadRate(ctx) {
                if (ctx.state.rate==1) {
                    await loadHelper(ctx, "getrate", "setRate")
                }
            },

        },

    })

    return Store
}
