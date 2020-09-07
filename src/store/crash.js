
import config from 'src/config.js';
import {loadHelper} from './common'

export default {
    namespaced: true,
    state: function() {
        return {
            crash: [],
        }
    },

    getters: {
        crash: state => state.crash,
    },

    mutations: {
        setCrash: (state, crash) => {
            //console.log("SET_SALES", sales.length);
            state.crash = crash;
        },

    },

    actions: {
        async load(ctx, { curCar }) {
            await loadHelper(ctx, config.apiVendor + curCar + '/crash', "setCrash" )
        },
            
    },

};
