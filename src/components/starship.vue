<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Starship',
  computed: {
    ...mapGetters('starship', [
      'item',
      'loading'
    ]),
  },
  created() {
    this.fetchStarship(this.$route.params)
  },
  methods: {
  ...mapActions('starship', [
      'fetchStarship',
    ]),
  },
}
</script>

<template>
  <div class="starship">
    <router-link
      :to="{name: 'starships'}"
    >
      &lt; back to stasrhips
    </router-link>
    <div v-if="loading">...</div>
    <template v-else>
      <h1>Starship</h1>
      <ul class="starship__list">
        {{ item }}
      </ul>
    </template>
  </div>
</template>
