import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Home.vue')
    },
    {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('@/views/login.vue')
    },
    {
    path: '/add_client',
    name: 'add_client',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/categories.vue')
    },
    {
    path: '/detail/:id',
    name: 'detail-record',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/detail-record.vue')
    },
    {
    path: '/bills_in',
    name: 'bills_in',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/bills_in.vue')
    },
    {
      path: '/bills_out',
      name: 'bills_out',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/bills_out.vue')
      },
    {
    path: '/clients',
    name: 'clients',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/clients.vue')
    },
    {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/profile.vue')
    },
    {
    path: '/record_in',
    name: 'record_in',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/record_in.vue')
    },
    {
      path: '/record_out',
      name: 'record_out',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/record_out.vue')
      },
      {
        path: '/admin/bills_in',
        name: 'all_bills_in',
        meta: {layout: 'main', auth: true},
        component: () => import('@/views/all_bills_in.vue')
        },
        {
          path: '/admin/bills_out',
          name: 'all_bills_out',
          meta: {layout: 'main', auth: true},
          component: () => import('@/views/all_bills_out.vue')
          },
      {
        path: '/record_workers',
        name: 'record_workers',
        meta: {layout: 'main', auth: true},
        component: () => import('@/views/record_workers.vue')
        },
      {
        path: '/workers',
        name: 'workers',
        meta: {layout: 'main', auth: true},
        component: () => import('@/views/workers.vue')
        },
        {
          path: '/admin/workers',
          name: 'all_workers',
          meta: {layout: 'main', auth: true},
          component: () => import('@/views/all_workers.vue')
          },
    {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('@/views/register.vue')
    }
  ]
})

router.beforeEach((to,from,next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else { next() }
})

export default router
