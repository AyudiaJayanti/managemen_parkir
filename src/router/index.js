import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/Profile',
    name: 'Profile',
    component: () => import('../components/Profile1'),
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
    path: '/Vehicle',
    name: 'Vehicle',
    component: () => import('../components/VehicleData'),
    meta: {
      auth: true
    }
  },

  {
    path: '/MasukTamu',
    name: 'MasukTamu',
    component: () => import('../components/MasukTamu'),
    meta: {
      auth: true
    }
  },
  {
    path: '/MasukMobil',
    name: 'MasukMobil',
    component: () => import('../components/MasukMobilCam'),
    meta: {
      auth: true
    }
  },
  {
    path: '/MasukMotor',
    name: 'MasukMotor',
    component: () => import('../components/MasukMotorCam'),
    meta: {
      auth: true
    }
  },
  {
    path: '/Keluar',
    name: 'Keluar',
    component: () => import('../components/KeluarCam'),
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})
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
