import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    API_URL: 'https://speedkaraoke.herokuapp.com/api/v1/',
    PUBLIC_URL: 'https://speedkaraoke.herokuapp.com',
}

export default new Vuex.Store({
    state
})