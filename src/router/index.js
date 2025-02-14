import store from '../store';

import { createRouter, createWebHistory } from 'vue-router';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../App.vue'),

  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../components/ProductsList.vue'),

  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../components/Cart.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../components/Orders.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../components/Main.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
