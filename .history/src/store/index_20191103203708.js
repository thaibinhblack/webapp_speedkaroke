import Vue from 'vue'
import Vuex from 'vuex'
import mapModule from './modules/map'
Vue.use(Vuex)
const state = {
    API_URL: 'https://speedkaraoke.herokuapp.com/api/v1/',
    PUBLIC_URL: 'https://speedkaraoke.herokuapp.com',
}

export default new Vuex.Store({
    state
})