import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy loaded pages
const Login      = () => import('../views/User/Login.vue')
const Signup     = () => import('../views/User/Signup.vue')
const Home       = () => import('../views/User/Home.vue')
const BookDetail = () => import('../views/User/BookDetail.vue')
const Authors    = () => import('../views/Admin/Authors.vue')
const NotFound   = () => import('../views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/login',          name: 'Login',      component: Login },
  { path: '/signup',    name: 'Signup',     component: Signup },
  { path: '/home',      name: 'Home',       component: Home },
  { path: '/authors',   name: 'Authors',    component: Authors,    meta: { requiresAuth: true } },
  { path: '/books/:id', name: 'BookDetail', component: BookDetail, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard: redirect to login only for strictly protected routes
router.beforeEach((to) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) return '/'
})

export default router
