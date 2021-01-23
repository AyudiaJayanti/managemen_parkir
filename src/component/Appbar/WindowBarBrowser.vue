<template>
  <div>
    <v-system-bar
      window
      absolute
      dark
      class="py-2 px-2"
      height="50px"
    >
      
      <a class="a" href="/">
        <v-icon class="mx-2">mdi-home</v-icon>
      </a>
      <v-btn rounded :active="this.$route.name == 'Dashboard'" class="mx-2 btn-bar" height="30px"  to="/Dashboard"> 
          Admin
      </v-btn>
      <v-btn rounded :active="this.$route.name=='MasukMobil'" class="mx-2 btn-bar" height="30px" to="/MasukMobil">
          Masuk
      </v-btn>
      <v-btn rounded :active="this.$route.name=='Keluar'" class="mx-2 btn-bar" height="30px" to="/Keluar">
          Keluar
      </v-btn>
      <v-btn rounded :active="this.$route.name=='MasukTamu'" class="mx-2 btn-bar" height="30px" to="/MasukTamu">
          Tamu
      </v-btn>
      <v-spacer></v-spacer>
    </v-system-bar>
  </div>
</template>
<script>

</script>