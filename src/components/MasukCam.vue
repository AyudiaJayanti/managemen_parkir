<template>
    <StreamBarcodeReader
      @decode="onDecode"
      @loaded="onLoaded"
    ></StreamBarcodeReader>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import ParkirService from "../services/ParkirService"

export default {
  name: 'MasukCam',

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
        ParkirService.masuk(id)
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
  }
}
</script>