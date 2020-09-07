import config from 'src/config.js';
import {PrepareNews} from 'src/prepareContent.js';
import {loadHelper} from './common'

const state = function () {
    return {
        carNews: [],
        allNews: [],
        newsItem: 0,
    }
}


const getters = {
    carNews: state => state.carNews, 
    allNews: state => state.allNews,
    newsItem: state => state.newsItem,
}


const mutations = {
    setCarNews(state, news) {
      state.carNews = news;
    },

    setAllNews(state, news) {
      state.allNews = news;
    },

    setNewsItem(state, news) {
      PrepareNews (news)  
      state.newsItem = news;
    },
}

const actions = {
    async loadCarNews(ctx, { curCar } ) {
        await loadHelper(ctx, config.apiVendor + curCar + '/getnews', "setCarNews")
    },

    async loadAllNews(ctx) {
        await loadHelper(ctx, config.apiVendor + 'getnews', "setAllNews")
    },

    async loadNewsItem (ctx, payload) {
        await loadHelper(ctx, `getnewsitem/?newsid=${payload}`, "setNewsItem")
    },

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
