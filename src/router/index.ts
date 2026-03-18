import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy loaded pages
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router