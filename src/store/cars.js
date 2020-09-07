import Vue from "vue"
import config from 'src/config.js';
import {loadHelper} from './common'

const state = function () {
    return {
      cars: [ ] 
    }
}


const getters = {
    cars : state => state.cars,
    getLogo: state => carData => config.imageServer + carData.photodir + "/logo2.jpg"
}


const mutations = {
    setCars : (state, cars) => {

        cars.forEach(item => {
           let a = item.href.split('/');
           if (item.href[0]=='/')
              a.shift();
           if (config.removeExtraPathItem>0)
              a.shift();
           if (config.removeExtraPathItem>1)
              a.shift();
           if (item.href[item.href.length-1]=='/')
              a.pop();
           item.hrefCar = a[a.length-1]; 
           item.href = a.join("/");
        });

        state.cars = cars;
    }
}


const actions = {
	async load(ctx) {
        await loadHelper(ctx, config.apiVendor + 'getcars', "setCars")
	}
}





export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
  