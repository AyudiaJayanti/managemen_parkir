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
  name: 'App',

  components: {    
    StreamBarcodeReader
  },

  data: () => ({
    //
  }),

  methods: {
    onDecode (id) {
      ParkirService.masuk(id)
        .then((data) => {
          
        })
        .catch((err) => {
          
        })
    },
    onLoaded () {
      console.log("loaded")
    }
  }
}
</script>