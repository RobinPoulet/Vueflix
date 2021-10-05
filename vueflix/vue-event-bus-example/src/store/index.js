import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        moviesList: [],
    },
    getters: {},
    mutations: {
        SET_MOVIES_LIST(state, moviesList) {
            state.moviesList = moviesList
        }
    },
    actions: {
        getMoviesList({commit}) {
            axios.get("https://apimovietest.herokuapp.com/api/movies")
                .then(response => {
                    const moviesApi = [];
                    const allData = response.data;
                    allData.forEach(data => {
                        moviesApi.push(data.value)
                    })
                    commit('SET_MOVIES_LIST', moviesApi)
                })
        }
    },
    modules: {}
})
