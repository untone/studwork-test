<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Starships',
  computed: {
    ...mapGetters('starships', [
      'list',
      'loading',
      'total',
    ]),
    query() {
      const params = {}
      if (this.search) {
        params.search = this.search
      }
      if (this.page > 1) {
        params.page = this.page
      }
      return params
    },
    pager() {
      return this.total > 10
    }
  },
  data() {
    return {
      search: this.$route.query.search || '',
      page: parseInt(this.$route.query.page, 10) || 1,
    }
  },
  watch: {
    '$route'(to) {
      this.search = to.query.search || ''
      this.getStarships()
    },
    search(newVal) {
      this.$router.push({
        query: this.query
      })
    },
    page(newVal) {
      this.$router.push({
        query: this.query
      })
    },
  },
  created() {
    this.getStarships()
  },
  methods: {
    ...mapActions('starships', [
      'fetchStarships',
    ]),
    ...mapMutations('starships', [
      'setPage',
    ]),
    getId(url) {
      return url.match(/(\d*)\/$/)[1]
    },
    getStarships() {
      this.fetchStarships(this.query)
    },
    onSearch() {
      this.getStarships()
    },
    onPage(page) {
      this.page = page === 'next' ? this.page + 1 : this.page -1
    },
    onClean() {
      this.search = ''
      this.page = 1
      this.getStarships()
    },
  },
}
</script>

<template>
  <div class="starships">
    <div>
      <input
        v-model="search"
        type="text"
        @input="onSearch"
      >
      <button
        v-if="search"
        @click="onClean"
      >
        x
      </button>
    </div>
    <div v-if="loading">...</div>
    <ul v-else>
      <li v-for="item in list">
        <router-link
          :to="{
            name: 'starship',
            params: {
              id: getId(item.url)
            }
          }"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <template
      v-if="pager"
    >
      <button
        @click="onPage('prev')"
        :disabled="page === 1"
      >
        prev
      </button>
      <button
        @click="onPage('next')"
        :disabled="(page * 10) > total"
      >
        next
      </button>
    </template>
  </div>
</template>
