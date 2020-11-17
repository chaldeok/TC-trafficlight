import Vue from 'vue'
import VueRouter from 'vue-router'
import Trafficlight from '@/components/Trafficlight'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/red'
  },
  {
    path: '/:id',
    name: 'Trafficlight',
    component: Trafficlight
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
