<template>
  <v-app-bar app dark>
    <v-icon class="clickable">mdi-cog-outline</v-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title class="mr-0 pr-4">
      <span class="hidden-sm-and-down">20 Januari 2020</span>
    </v-toolbar-title>
    <Avatar />
  </v-app-bar>
</template>
<script>
import Avatar from "../Avatar";
export default {
  name: "App",
  props: {
    source: String,
  },
  components: {
    Avatar,
  },

  data: () => ({}),
};
</script>

<style>
.clickable {
  -webkit-app-region: no-drag;
}
</style>
