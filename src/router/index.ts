import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/User/Login.vue'
import Signup from '../views/User/Signup.vue'
import Home from '../views/User/Home.vue'
import BookDetail from '../views/User/BookDetail.vue'
import Authors from '../views/Admin/Authors.vue'
import NotFound from '../views/NotFound.vue'
import AllBooks from '../views/User/AllBooks.vue'
import Favorites from '../views/User/Favorites.vue'
import Books from '../views/Admin/Books.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' }, 

  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/home', name: 'Home', component: Home },

  {
    path: '/books',
    name: 'Books',
    component: Books,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors,
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/books/:id',
    name: 'BookDetail',
    component: BookDetail,
    meta: { requiresAuth: true }
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !isAuthenticated) return '/login'
  if (to.meta.requiresAdmin && role !== 'admin') return '/home'
})

export default router