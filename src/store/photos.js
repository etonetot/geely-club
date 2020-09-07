import config from 'src/config.js';
import { loadHelper } from './common'

export default {
    namespaced: true,

    state: function () {
        return {
            photos: [],
        }
    },

    getters: {
        photos: state => state.photos,
        curFolderTitle: state => curFolder => state.photos.length ? state.photos[curFolder].title : '--'
    },

    mutations: {
        setPhotos: (state, payload) => {
            state.photos = payload.photos;
        },

    },

    actions: {
        async load(ctx, { curCar }) {
            await loadHelper(ctx, config.apiVendor + curCar + '/getphotos', "setPhotos" )
        },
    },

};
