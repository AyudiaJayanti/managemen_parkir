<template>
  <div>
    <v-system-bar
      window
      absolute
      dark
      class="py-2 px-2"
      height="50px"
    >
<<<<<<< HEAD
=======
      
      <a class="a" href="/">
        <v-icon class="mx-2">mdi-home</v-icon>
      </a>
>>>>>>> candra/master
      <v-btn rounded :active="$route.name == 'Dashboard'" class="mx-2 btn-bar" height="30px"  to="/Dashboard"> 
          Admin
      </v-btn>
      <v-btn rounded :active="$route.name=='MasukMobil'" class="mx-2 btn-bar" height="30px" to="/MasukMobil">
          Masuk
      </v-btn>
      <v-btn rounded class="mx-2 btn-bar" height="30px" to="/Keluar">
          Keluar
      </v-btn>
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/MasukTamu">
          Tamu
      </v-btn>
      <v-spacer></v-spacer>
      <v-icon @click="minWindow" class="btn-min">mdi-minus</v-icon>
      <v-icon @click="maxWin" class="btn-min">mdi-checkbox-blank-outline</v-icon>
      <v-icon @click="close" class="btn-close">mdi-close</v-icon>
    </v-system-bar>
  </div>
</template>
<script>
const remote = require('electron').remote

    export default{
        data(){
            return {
                w : remote.getCurrentWindow()
            }
        },
        methods: {
            close() {
                this.w.close()
            },
             minWindow(){
              this.w.minimize()
            },
            maxWin(){
              this.w.isMaximized()?this.w.unmaximize():this.w.maximize()
            },
        }
    }
</script>