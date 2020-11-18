<template>
  <div>
    <v-system-bar
      window
      absolute
      dark
      class="py-2 px-2"
      height="50px"
    >
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/Dashboard"> 
          Admin
      </v-btn>
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/Login">
          Masuk
      </v-btn>
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/">
          Keluar
      </v-btn>
      <v-spacer></v-spacer>
      <v-icon>mdi-minus</v-icon>
      <v-icon>mdi-checkbox-blank-outline</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
  </div>
</template>
<style scoped>
.btn-bar{
    width: 80px;
    font-size: 0.7rem;
}
</style>