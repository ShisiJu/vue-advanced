import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    info: {
      name: 'juss',
    },
  },
  getters: {
    powerCount (state) {
      return state.count * state.count
    },
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    setInfoName(state,newName){
      state.info.name = newName
    }
  },
  actions: {
    refreshName ({ commit }) {
      setTimeout(function () {
        commit('setInfoName','hello world')
      },2000)
    },
  },
})

export default store
