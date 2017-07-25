// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';

import Vue from 'vue';
import { App } from './app';
import router from './router';
import store from './store';
import 'bulma/css/bulma.css';

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
Vue.component('icon', Icon);

import Meta from 'vue-meta';
Vue.use(Meta);

import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: process.env.GOOGLE_ANALYTICS_ID,
  router
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
