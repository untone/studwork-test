<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Starships',
  computed: {
    ...mapGetters('starships', ['list', 'loading', 'total']),
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
    },
  },
  data() {
    return {
      search: this.$route.query.search || '',
      page: parseInt(this.$route.query.page, 10) || 1,
    }
  },
  watch: {
    $route(to) {
      this.search = to.query.search || ''
      this.getStarships()
    },
    search(newVal) {
      this.$router.push({
        query: this.query,
      })
    },
    page(newVal) {
      this.$router.push({
        query: this.query,
      })
    },
  },
  created() {
    this.getStarships()
  },
  methods: {
    ...mapActions('starships', ['fetchStarships']),
    ...mapMutations('starships', ['setPage']),
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
      this.page = page === 'next' ? this.page + 1 : this.page - 1
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
  <article>
    <form>
      <input
        v-model="search"
        type="text"
        placeholder="Search starships by name, model"
        @input="onSearch"
      />
      <button v-if="search" @click="onClean">
        ×
      </button>
    </form>
    <transition name="fade">
      <pre v-if="loading">...</pre>
      <ul v-else>
        <router-link
          v-for="(item, key) in list"
          tag="li"
          :key="key"
          :to="{
            name: 'starship',
            params: {
              id: getId(item.url),
            },
          }"
        >
          <a>
            <dl>
              <dt>Name</dt>
              <dd>{{ item.name }}</dd>
              <dt>Model</dt>
              <dd>{{ item.model }}</dd>
            </dl>
          </a>
        </router-link>
      </ul>
    </transition>
    <footer v-if="pager">
      <button @click="onPage('prev')" :disabled="page === 1">
        Previous
      </button>
      <button @click="onPage('next')" :disabled="page * 10 > total">
        Next
      </button>
    </footer>
  </article>
</template>

<style lang="stylus">

form
  position relative
  margin 0
  padding 0 0 80px

  input
    margin 0
    padding 0 60px 0 25px
    width 100%
    height 60px
    line-height 60px
    font-family: 'Space Mono', monospace;
    font-size 16px
    color #574e00
    background-color #000
    border 2px solid #605700
    transition color .25s, background-color .25s, border-color .25s, z-index .15s
    outline none
    apperance none

    &:focus
      color #ae9d00
      background-color #2C2707
      border-color #ae9d00

  button
    position absolute
    top 0
    right 0
    width 60px
    height 60px
    display flex
    align-items center
    justify-content center
    color #ae9d00
    font-size 22px
    font-weight 700
    border none
    background none
    apperance none
    outline none
    cursor pointer
    opacity 0.65
    transition opacity .25s

    &:hover,
    &:focus
      opacity 1

article
  display flex
  flex-direction column
  height 100%

pre
  margin 0
  padding 0
  flex-grow 1
  display flex
  align-items center
  justify-content center
  color #e5e5e5

ul
  margin 0
  padding 0
  list-style none
  display flex
  flex-direction column

  li
    margin 0 0 -1px
    padding 0
    height 120px

    a
      position relative
      margin 0
      padding 35px
      display block
      width 100%
      height 120px
      text-decoration none
      outline none
      background-color #141002
      border 1px solid #6a6a6a
      transition border-color .25s, background-color .25s

      &:hover
        z-index 1
        background-color #1a1601
        border-color #ae9d00

    dl
      display flex
      flex-wrap wrap
      width 100%
      margin 0
      padding 0
      font-size 13px

      dt
        margin 0
        padding 0
        width 70px
        flex-grow 0
        color #e5e5e5

      dd
        margin 0
        padding 0
        flex-grow 1
        flex-basis calc(100% - 70px)
        color #ae9d00

        &:first-of-type
          font-size 18px
          font-weight 700

footer
  height 80px
  flex-shrink 0
  display flex
  align-items center
  justify-content space-between

  button
    display flex
    align-items center
    justify-content center
    height 100%
    margin 0
    padding 0 30px
    height 100%
    color #ae9d00
    font-family: 'Space Mono', monospace;
    font-size 16px
    font-weight 700
    background none
    border none
    appearance none
    outline none
    cursor pointer

    &:hover,
    &:focus
      color #e5e5e5

    &[disabled]
      color #6a6a6a
      cursor default
</style>
