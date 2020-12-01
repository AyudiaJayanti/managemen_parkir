<template style="-webkit-app-region: drag">
  <v-app>
    <WindowBar />
    <div>
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
    <MasukTamu v-else-if="CheckIfRoute('MasukTamu')" />
    <Home v-else/>
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
    MasukTamu,
    WindowBar,
  },
}
</script>
