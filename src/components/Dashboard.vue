<template>
  <v-app>
    <v-main class="pr-5 pl-5 pt-5 pb-5 background-main">
      <h2>Dashboard</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col md="5"> </v-col>

          <v-col md="4">
            <v-card>
              <LineChart />
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <UserProfile />
          </v-col>
        </v-row>
      </div>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import LineChart from "../component/Card/LineChart";
import UserProfile from "../component/Card/UserProfile";
export default {
  name: "Dashboard",

  components: {
    LineChart,
    UserProfile,
  },
  data: () => ({}),
};
</script>
