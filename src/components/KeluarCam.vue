<template >
  <v-container fill-height fluid >
    <v-row align="center" justify="center">
      <v-card color="basil border" width="625" elevation="20" class="py-5" >
        <v-card-title class="mb-5 mx-5">
          <v-avatar color="primary" class="mr-5">
            <v-icon dark >mdi-parking</v-icon>
          </v-avatar>
          <h2>Scan Your Barcode!</h2></v-card-title>
        <StreamBarcodeReader 
          @decode="onDecode"
          @loaded="onLoaded"
        ></StreamBarcodeReader>
      </v-card>
      
    </v-row>
  </v-container>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader"
import ParkirService from '../services/ParkirService'

export default {
  name: 'KeluarCam',  

  components: {    
    StreamBarcodeReader
  },

  data: () => ({
    isPaused: false
  }),

  methods: {    
    onDecode(id) {
      if(!this.isPaused) {
        this.isPaused = true
        ParkirService.keluar(id)
          .then(response => {
            var nama = response.data.data.guru != null? response.data.data.guru.nama : response.data.data.siswa.nama
            this.$swal({
              title: 'Have a nice day ' + nama + '!',
              text: 'Silahkan Keluar',
              icon: 'success',  
              showConfirmButton: false,
              timer: 1500
            })
          })      
          .catch(err => {
            console.log(err.response.data.messages)                  
            this.$swal({
              title: err.response.data.messages,
              text: 'Gagal Keluar',
              icon: 'error',                    
              showConfirmButton: false,
              timer: 1500
            })
          })
        
        setTimeout(() => {
          this.isPaused = false
        }, 2500)
  
      }
    },
    onLoaded() {
      console.log("loaded")
    },   
  }
}
</script>