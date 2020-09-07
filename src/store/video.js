import config from 'src/config.js';
import { loadHelper } from './common'

export default {
    namespaced: true,
    
    state: function() {
        return {
            video: [],
        }
    },

    getters: {
        video: state => state.video
    },

    mutations: {
        setVideo: (state, payload) => {
            state.video = payload;
        },

    },

    actions: {
        async load(ctx, {curCar}) {
            await loadHelper(ctx, config.apiVendor + curCar + '/getvideo', "setVideo")
        },
   
    },

};
