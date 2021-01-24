<template>
  <v-app>
    <WindowBar />
    
    <div>
      <transition name="fade">
    <Appbar
      v-if="
        CheckIfRoute('Dashboard') ||
        CheckIfRoute('Parking') ||
        CheckIfRoute('Students') ||
        CheckIfRoute('Teacher') ||
        CheckIfRoute('Guest') ||
        CheckIfRoute('User') ||
        CheckIfRoute('Vehicle')  
      "
    />

    <Login v-else-if="CheckIfRoute('Login')" />
    <MasukTamu v-else-if="CheckIfRoute('MasukTamu')" />
    <MasukMobil v-else-if="CheckIfRoute('MasukMobil')" />
    <!-- <MasukMotor v-else-if="CheckIfRoute('MasukMotor')" /> -->
    <Keluar v-else-if="CheckIfRoute('Keluar')" />
    <Home v-else/></transition>
    </div>
  </v-app>
</template>

<script>
import "./styles/style.css"
import Appbar from "./component/Appbar/Appbar"
import WindowBar from "./component/Appbar/WindowBar"
import Login from "./components/Login"
import Home from "./views/Home"
import MasukTamu from "./components/MasukTamu"
import Keluar from './components/KeluarCam.vue'
import MasukMobil from './components/MasukMobilCam.vue'
// import MasukMotor from './components/MasukMotorCam.vue'


export default {
  name: "App",
  methods: {
    CheckIfRoute: function (routeName) {
      return this.$route.name === routeName;
    },  
  },
  components: {
    Appbar,
    Login,
    Home,
    MasukTamu,
    MasukMobil,
    // MasukMotor,
    Keluar,
    WindowBar,
  },
}

</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active di bawah versi 2.1.8 */ {
  opacity: 0;
}
</style>
