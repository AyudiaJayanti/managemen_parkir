<template  style="-webkit-app-region: drag">
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
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/Dashboard"> 
          Admin
      </v-btn>
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/Login">
          Masuk
      </v-btn>
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/">
          Keluar
      </v-btn>
      <v-btn rounded color="grey" class="mx-2 btn-bar" height="30px" to="/MasukTamu">
          Tamu
      </v-btn>
      <v-spacer></v-spacer>
      <v-icon @click="minWindow">mdi-minus</v-icon>
      <v-icon @click="maxWin">mdi-checkbox-blank-outline</v-icon>
      <v-icon @click="close">mdi-close</v-icon>
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
            }
        }
    }

</script>
<style scoped>
.btn-bar{
    width: 80px;
    font-size: 0.7rem;
}
</style>