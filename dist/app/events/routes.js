import * as components from './components';

export default [
  {
    path: '/',
    component: components.EventsListView,
    name: 'home'
  },
  {
    path: '/about',
    component: components.AboutView,
    name: 'about'
  }
];
