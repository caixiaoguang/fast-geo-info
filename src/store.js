import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: {}
  },
  mutations: {
    setMap(state, map) {
      state.map = map
    },
    addFeatureGroup(state, group) {
      group.addTo(state.map)
    }
  },
  actions: {

  }
})