import Vue from 'vue'
import VueRouter from 'vue-router'
// import TeachersData from '../components/TeachersData.vue'
// import StudentsData from '../components/StudentsData.vue'
// import Login from '../components/Login.vue'
// import ParkingData from '../components/ParkingData.vue'
// import GuestData from '../components/GuestData.vue'
// import UserData from '../components/UserData.vue'
// import Dashboard from '../components/Dashboard'
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
      logged: true
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
    path: '/',
    alias: '/masuk_mobil',
    name: 'masuk_mobil',
    component: () => import('../components/MasukMobilCam')
  },
  {
    path: '/masuk_motor',
    name: 'masuk_motor',
    component: () => import('../components/MasukMotorCam')
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

// melindungi dari yg belum login
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.auth)) {
    
    if (! Vue.prototype.$session.exists()) {
      next('/Login');
    } else {
      next();
    }
  } else {
    next();
  }

});

// langsung redirect saat ke halaman login lagi 
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.logged)) {
    if (Vue.prototype.$session.exists()) {
      next('/Dashboard');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
