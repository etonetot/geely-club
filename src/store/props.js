import config from 'src/config.js';
import { loadHelper } from './common'

export default {
    namespaced: true,

    state: function () {
        return {
            rows: [],
            cols: [],
        }
    },

    getters: {
        rows: state => state.rows,
        cols: state => state.cols
    },

    mutations: {
        setProps: (state, props) => {

            let cols = [{
                key: 'text',
                width: 250,
                fixed: 'left',
                type: 'html',
            }];

            for (let i = 0; i < props.varcount && i < 20; i++)
                cols.push({
                    key: 'text' + i,
                    width: 150,
                    type: 'html'
                });

            state.rows = props.rows;
            state.cols = cols;
        },

    },

    actions: {

        async load(ctx, { curCar, year }) {
            await loadHelper(ctx, config.apiVendor + curCar + '/getprops', "setProps", { year })
        },

    },

};
