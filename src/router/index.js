import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard'),
    meta: {
      auth: true
  }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      guest: true
  }
  },
  {
    path: '/Teacher',
    name: 'Teacher',
    component: () => import('../components/TeachersData'),
    meta: {
      auth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Login'),
    meta: {
      auth: true
  }
  },
  {
    path: '/Students',
    name: 'Students',
    component: () => import('../components/StudentsData'),
    meta: {
      auth: true
  }
  },
  {
    path: '/Parking',
    name: 'Parking',
    component: () => import('../components/ParkingData'),
    meta: {
      auth: true
  }
  },
  {
    path: '/Guest',
    name: 'Guest',
    component: () => import('../components/GuestData'),
    meta: {
      auth: true
  }
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('../components/UserData'),
    meta: {
      auth: true
  }
  },
  {
    path: '/',
    alias: '/masuk_mobil',
    name: 'masuk_mobil',
    component: () => import('../components/MasukMobilCam'),
    meta: {
      guest: true
  }
  },
  {
    path: '/masuk_motor',
    name: 'masuk_motor',
    component: () => import('../components/MasukMotorCam'),
    meta: {
      guest: true
  }
  },
  {
    path: '/keluar',
    name: 'keluar',
    component: () => import('../components/KeluarCam'),
    meta: {
      guest: true
  }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
