import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

import Clipboard from '@/components/clipboard/Clipboard.vue';
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Clipboard,
    },
    {
      path: "/Clipboard",
      component: Clipboard,
    },
  ],
});

export default router
