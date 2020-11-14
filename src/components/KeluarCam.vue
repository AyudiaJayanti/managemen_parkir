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
            console.log(response.data.messages)                      
            this.$swal({
              title: 'Have a nice day ' + '!',
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