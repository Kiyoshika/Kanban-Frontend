import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showDialog: false
    },

    mutations: {
        setVisible(state, payload) {
            state.showDialog = payload;
        }
    },

    getters: {
        isVisible: state => state.showDialog
    }
})