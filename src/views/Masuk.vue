<template>
  <v-carousel
    cycle
    height="100vh"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.src">
      <v-img />
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: [
        // { src: "../assets/LP-CAR.png" },
        //{ src: './../assets/vehicle.png' },
        {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
      ],
    };
  },
};
</script>
