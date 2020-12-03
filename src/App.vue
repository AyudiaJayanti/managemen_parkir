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
        CheckIfRoute('User')
      "
    />
    
    
    
    <Login v-else-if="CheckIfRoute('Login')" />
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
