<template>
  <v-app  style="-webkit-app-region: drag">
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
    <Home v-else/>
    

    <v-main> </v-main>
  </v-app>
  
</template>

<script>
import Appbar from "../src/component/Appbar";
import Login from "../src/components/Login.vue";
import Home from "./views/Home";

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
  },

  data: () => ({
    //
  }),
};
</script>
