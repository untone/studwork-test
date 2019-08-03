import Vue from 'vue'
import Vuex from 'vuex'

import { starships } from './modules/starships'
import { starship } from './modules/starship'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    starships: {
      namespaced: true,
      ...starships,
    },
    starship: {
      namespaced: true,
      ...starship,
    },
    errors: [],
  },
})
