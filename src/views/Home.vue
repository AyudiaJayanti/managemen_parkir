<template>
  <v-app>
    <!-- <Navbar /> -->
    <v-main class="my-0">
      <div>
        <img class="image-position" src="../assets/lp-car.svg">
      </div>
      <div class="ml-12" fluid>
          <b><h1>Let's Get Your Parking Lot.</h1></b>
          <p class="content-paragraph ">Temukan kemudahan dalam mencatat proses parkir sekolah anda.</p>

          <v-btn
            rounded
            color="black"
            height="50px"
            dark
            to="/Login"
          >
            Get Started
          </v-btn>
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
//import Navbar from "../component/Appbar/Navbar";
export default {
  components: {
    //Navbar,
  },
};
</script>
