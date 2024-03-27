import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/HomeView.vue') },
  { path: '/about', component: () => import('../components/AboutView.vue') },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
