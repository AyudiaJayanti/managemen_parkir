<template>
  <v-app>
    <Navbar />
    <v-main>
      <div style="margin: auto;" class="text-center">
        <h1 class="text-center">SCAN YOUR BARCODE</h1>
        <img src="../assets/lp-card.svg" width="50%">
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../component/Appbar/Navbar";
//import MasukCam from "../components/MasukMotorCam";
export default {
  components: {
    Navbar,
  },
};
</script>
