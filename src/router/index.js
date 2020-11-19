import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard')
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
    path: '/Teacher',
    name: 'Teacher',
    component: () => import('../components/TeachersData')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Login')
  },
  {
    path: '/Students',
    name: 'Students',
    component: () => import('../components/StudentsData')
  },
  {
    path: '/Parking',
    name: 'Parking',
    component: () => import('../components/ParkingData')
  },
  {
    path: '/Guest',
    name: 'Guest',
    component: () => import('../components/GuestData')
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('../components/UserData')
  },
  {
    path: '/',
    alias: '/masuk',
    name: 'masuk',
    component: () => import('../components/MasukCam')
  },
  {
    path: '/keluar',
    name: 'keluar',
    component: () => import('../components/KeluarCam')
  },
  {
    path: '/Vehicle',
    name: 'Vehicle',
    component: () => import('../components/VehicleData')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
