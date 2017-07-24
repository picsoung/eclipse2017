import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '../app';

import Meta from 'vue-meta';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  mode: 'history',
  routes: routes,
  linkActiveClass: 'is-active'
});
