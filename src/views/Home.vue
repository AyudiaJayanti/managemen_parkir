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
<style>
.image-position{
  position: absolute;
  right: 0;
  top: 0;
  height: 175%;
}
b h1{
  width: 500px;
  font-size: 3rem;
}
.content-paragraph{
    width: 400px;
    text-align: justify;
    margin-right: 50px;
    font-size: 20px;
}
</style>

<script>
import Navbar from "../component/Appbar/Navbar";
//import MasukCam from "../components/MasukMotorCam";
export default {
  components: {
    Navbar,
  },
};
</script>
