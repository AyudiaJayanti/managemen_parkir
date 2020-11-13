<template>
  <v-app>
    <Navbar />
    <v-main>
      <Masuk />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../component/Navbar";
import Masuk from "./Masuk";
export default {
  name: "Home",
  components: {
    Navbar,
    Masuk,
  },
};
</script>
