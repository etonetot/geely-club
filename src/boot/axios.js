import Vue from 'vue'
import axios from 'axios'
import config from 'src/config.js';

const instance = axios.create({
    baseURL: config.httpServer,
    timeout: 5000,

  });

Vue.prototype.$axios = instance
