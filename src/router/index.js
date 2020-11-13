import Vue from 'vue'
import VueRouter from 'vue-router'
import TeachersData from '../components/TeachersData.vue'
import StudentsData from '../components/StudentsData.vue'
import Login from '../components/Login.vue'
import ParkingData from '../components/ParkingData.vue'
import GuestData from '../components/GuestData.vue'
import UserData from '../components/UserData.vue'
import Dashboard from '../components/Dashboard'
import Home from '../views/Home'

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
    component: Dashboard
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
    component: TeachersData
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Students',
    name: 'Students',
    component: StudentsData
  },
  {
    path: '/Parking',
    name: 'Parking',
    component: ParkingData
  },
  {
    path: '/Guest',
    name: 'Guest',
    component: GuestData
  },
  {
    path: '/User',
    name: 'User',
    component: UserData
  },
  {
    path: '/visitor',
    name: 'Visitor',
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
