<template>
  <main id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="stylus">
*
  box-sizing border-box

html,
body
  margin 0
  padding 0
  font-family: 'Space Mono', monospace;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

body
  display flex
  flex-direction column
  height 100vh
  font-size 16px
  background-color #000
  background-image linear-gradient(to bottom, #000, #312d01)
  background-attachment fixed

main
  margin 0 auto
  padding 80px 0
  display flex
  flex-direction column
  margin 0 auto
  padding 80px 0
  min-width 640px
  max-width 640px
  height 100%
</style>
