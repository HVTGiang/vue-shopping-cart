import routeEndpoints from './route.endpoints'
import * as VueRouter from 'vue-router'
import { useSystem } from '@/core/store'

const { home, productDetail, cart, signIn, signUp } = routeEndpoints

const routes = [
  {
    path: '/u',
    component: () => import('@/layouts/BasicLayout/index.vue'),
    meta: { allowAnonymous: false },
    children: [
      {
        name: home.name,
        path: home.path,
        component: () => import('@/views/AllProducts/index.vue')
      },
      {
        name: productDetail.name,
        path: productDetail.path,
        component: () => import('@/views/DetailProduct/index.vue')
      },
      {
        name: cart.name,
        path: cart.path,
        component: () => import('@/views/Checkout/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/EmptyLayout/index.vue'),
    meta: { allowAnonymous: true },
    children: [
      {
        name: signUp.name,
        path: signUp.path,
        component: () => import('@/views/SignUp/index.vue')
      },
      {
        name: signIn.name,
        path: signIn.path,
        component: () => import('@/views/SignIn/index.vue')
      }
    ]
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const system = useSystem()

  console.log(system.isSignedIn)

  if (to.name === signIn.name && system.isSignedIn) {
    next({ path: home.path })
  } else if (!to.meta.allowAnonymous && !system.isSignedIn) {
    next({
      path: signIn.path,
      query: { redirect: to.fullPath }
    })
  } else next()
})

export default router
