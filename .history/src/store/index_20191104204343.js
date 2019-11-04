import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    API_URL: 'http://127.0.0.1:8000/api/v1/',
    PUBLIC_URL: 'http://127.0.0.1:8000',
}

export default new Vuex.Store({
    state
})