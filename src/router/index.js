import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Auth/Register')
  },
  {
    path: '/groups',
    name: 'group',
    component: () => import(/* webpackChunkName: "about" */ '../views/Group.vue')
  },
  {
    path: '/group/:id/info',
    name: 'groupDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupDetails')
  },
  {
    path: '/group/:id/members',
    name: 'groupMembers',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupMembers')
  },
  {
    path: '/group/:id/posts',
    name: 'GroupPosts',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupPosts')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
