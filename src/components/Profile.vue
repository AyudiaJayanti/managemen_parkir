<template>
  <div class="mx-5 my-5">
    <p v-if="parkir.length > 0">new Parkir</p>
    
  </div>
</template>

<script>

// var socket = require('socket.io-client')('http://localhost:3000'); 

export default {
  data() {
    return {
      isConnected: false,
      socketMessage: '',
      parkir: []
    }
  },
  created() {
    // socket.on('newParkir', function(data){
    //   console.log(data)
    // })
    // socket.on('newChange', function(){
    //   console.log('there is new change!')
    // })
  },
  sockets: {
    newChange: function () {
      console.log('newChangeDetected')
    },
  },
}
</script>