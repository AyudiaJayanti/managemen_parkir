<template>
  <v-app>
    <WindowBar/>
    <Appbar
      v-if="
        CheckIfRoute('Dashboard') ||
        CheckIfRoute('Parking') ||
        CheckIfRoute('Students') ||
        CheckIfRoute('Teacher') ||
        CheckIfRoute('Guest') ||
        CheckIfRoute('User')||
        CheckIfRoute('Vehicle')
      "
    />
    
    <Login v-else-if="CheckIfRoute('Login')" />
    <Home v-else/>
    
  </v-app>
</template>

<script>
import './styles/style.css';
import Appbar from "../src/component/Appbar/Appbar";
import Login from "../src/components/Login.vue";
import Home from "./views/Home";
import WindowBar from './component/Appbar/WindowBar.vue';

export default {
  name: "App",
  methods: {
    CheckIfRoute: function (routeName) {
      console.log(this.$route.name === routeName);
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