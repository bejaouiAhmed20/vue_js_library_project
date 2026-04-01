import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/User/Home.vue'
import BookDetail from '../views/User/BookDetail.vue'
import Authors from '../views/Admin/Authors.vue'
import NotFound from '../views/NotFound.vue'
import Books from '../views/Admin/Books.vue'
import Favorites from '../views/User/Favorites.vue'
import AllBooks from '../views/User/AllBooks.vue'
import AddBook from '../views/User/AddBook.vue'

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
    path: '/add-book',
    name: 'AddBook',
    component: AddBook,
    meta: { requiresAuth: true }
  },
  {
    path: '/Favourites',
    name: 'Favourites',
    component: Favorites,
    meta: { requiresAuth: true }
  },
  {
    path: '/allbooks',
    name: 'AllBooks',
    component: AllBooks,
    meta: { requiresAuth: true }
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