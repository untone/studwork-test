import { getStarships } from '../../api'

export const starships = {
  state: {
    list: [],
    loading: true,
    total: 0,
  },
  getters: {
    list: state => state.list,
    loading: state => state.loading,
    total: state => state.total,
  },
  mutations: {
    setList(state, { results, count }) {
      state.list = results
      state.total = count
      state.loading = false
    },
    setPage(state, page) {
      state.page = page
    },
  },
  actions: {
    async fetchStarships({ commit, state }, payload = {}) {
      const { page } = payload
      state.loading = true
      if (page) {
        commit('setPage', page)
      }
      const data = await getStarships(payload)
      if (data) {
        commit('setList', data)
      }
    },
  },
}
