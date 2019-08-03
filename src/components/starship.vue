<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Starship',
  computed: {
    ...mapGetters('starship', ['item', 'loading']),
  },
  created() {
    this.fetchStarship(this.$route.params)
  },
  methods: {
    ...mapActions('starship', ['fetchStarship']),
  },
}
</script>

<template>
  <section>
    <router-link :to="{ name: 'starships' }">
      Back to stasrhips
    </router-link>
    <pre v-if="loading">...</pre>
    <template v-else>
      <dl>
        <template v-for="(entry, key) in item">
          <dt>{{ key }}</dt>
          <dd>
            <template v-if="Array.isArray(entry)">
              <span v-for="value in entry">
                {{ value }}
              </span>
            </template>
            <template v-else>
              {{ entry }}
            </template>
        </dd>
      </dl>
    </template>
  </section>
</template>

<style lang="stylus">
pre
  margin 0
  padding 0
  flex-grow 1
  display flex
  align-items center
  justify-content center
  color #e5e5e5

section
  margin 0
  display flex
  flex-direction column

  a
    display block
    margin 0 0 80px
    padding 0
    height 60px
    line-height 60px
    color #ae9d00
    font-size 16px
    font-weight 700
    text-decoration none

  dl
    display flex
    flex-wrap wrap
    width 100%
    margin 0
    padding 35px
    font-size 13px
    line-height 18px
    background-color #141002
    border 1px solid #6a6a6a

    dt
      margin 0
      padding 0 0 10px
      flex-basis 200px
      flex-grow 0
      color #e5e5e5

    dd
      margin 0
      padding 0 0 10px
      flex-grow 1
      flex-basis calc(100% - 200px)
      color #ae9d00

      &:first-of-type
        font-size 18px
        font-weight 700
</style>
