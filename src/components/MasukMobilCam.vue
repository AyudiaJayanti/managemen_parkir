<template >
  <v-container fill-height fluid >
    <v-row align="center" justify="center">
      <v-card color="basil" width="625" elevation="20" class="py-5" >
        <v-card-title class="mb-5 mx-5">
          <v-avatar color="primary" class="mr-5">
            <v-icon dark >mdi-parking</v-icon>
          </v-avatar>
          <h2>Scan Your Barcode!</h2></v-card-title>
        <v-tabs
          v-model="tab"
          background-color=""
          color="primary"
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item"
            @click="roleChange(item)"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <StreamBarcodeReader 
          @decode="onDecode"
          @loaded="onLoaded"
        ></StreamBarcodeReader>
      </v-card>
      
    </v-row>
  </v-container>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import ParkirService from "../services/ParkirService"

export default {
  name: 'MasukMobilCam',

  components: {    
    StreamBarcodeReader
  },

  data: () => ({
    jenis: 1,
    isPaused: false,
    tab: null,
    items: [
      'Motor', 'Mobil'
    ],
  }),

  methods: {    
    onDecode(id) {
      if(!this.isPaused) {
        this.isPaused = true
        ParkirService.masuk(id, this.jenis)
          .then(response => {
            console.log(response.data.messages)          
            this.$swal({
              title: response.data.messages,
              text: 'Silahkan Masuk',
              icon: 'success',  
              showConfirmButton: false,
              timer: 1500               
            })
          })      
          .catch(err => {
            console.log(err.response.data.messages)                  
            this.$swal({
              title: err.response.data.messages,
              text: 'Anda Tidak Diizinkan Masuk',
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

    roleChange(role) {
      role == 'Motor'? this.jenis = 1 : this.jenis = 2
    }
  }
}
</script>