import { getStarship } from '../../api'

export const starship = {
  state: {
    item: {},
    loading: true,
  },
  getters: {
    item: state => state.item,
    loading: state => state.loading,
  },
  mutations: {
    setItem(state, payload) {
      state.item = payload
      state.loading = false
    },
  },
  actions: {
    async fetchStarship({ commit, state }, payload) {
      const data = await getStarship(payload)
      if (data) {
        commit('setItem', data)
      }
    },
  },
}
