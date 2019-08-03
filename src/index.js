import 'idempotent-babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import store from './store';

Vue.use(VueRouter);

import App from './app.vue';

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
});

Vue.config.devtools = process.env.NODE_ENV === 'development';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;

export {router};
