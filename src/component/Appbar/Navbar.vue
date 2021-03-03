<template>
  <v-app-bar app dark>
    <v-icon class="clickable">mdi-cog-outline</v-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title class="mr-0 pr-4">
      <span class="hidden-sm-and-down">{{moment().format('DD MMMM YYYY')}}</span>
    </v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {
  name: "App",
  props: {
    source: String,
  },
  components: {
  },

  data: () => ({
  }),
};
</script>

<style>
.clickable {
  -webkit-app-region: no-drag;
}
</style>
