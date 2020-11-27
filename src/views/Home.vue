<template>
  <v-app>
    <Navbar />
    <v-main>
      <Masuk/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../component/Appbar/Navbar";
import Masuk from "./Masuk";
//import MasukCam from "../components/MasukMotorCam";
export default {
  name: "Home",
  components: {
    Navbar,
    Masuk,
  },
};
</script>
