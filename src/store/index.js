import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({

    plugins: [createPersistedState({
        storage: window.localStorage
    })],

    state: {
        username: '',
        password: ''
    },

    mutations: {
        // payload = object storing username and password
        setCredentials(state, payload) {
            state.username = payload.username;
            state.password = payload.password;
        }
    },

    getters: {
        getUsername: state => state.username,
        getPassword: state => state.password
    }
})