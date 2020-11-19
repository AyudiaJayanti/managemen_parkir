<template>
  <v-app>
    <v-main class="pr-5 pl-5 pt-5 pb-5 background-main">
      <h2>Dashboard</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col md="3">
            <v-card
            class="px-2 py-2">
            <div>
              <v-icon
              class="px-2 py-2"
              style="background-color: grey; border-radius: 5px"
              x-large>
                mdi-school-outline
              </v-icon>
              <span class="d-inline">
              <h3>333</h3>
              <h6>Siswa</h6>
              </span>
            </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "Dashboard",

  components: {
  },
  data: () => ({}),
};
</script>
