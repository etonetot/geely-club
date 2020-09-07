import config from 'src/config.js';
import {loadHelper} from './common'

export default {
    namespaced: true,
    state: function() {
        return {
            sales: [],
        }
    },

    getters: {
        sales_rus: state => state.sales.rus,
        sales_china: state => state.sales.china
    },

    mutations: {
        setSales: (state, sales) => {
            //console.log("SET_SALES", sales.length);
            state.sales = sales;
        },

    },

    actions: {
        async load(ctx, { curCar }) {
            await loadHelper(ctx, config.apiVendor + curCar + '/getsales', "setSales" )
        },
            
    },

};
