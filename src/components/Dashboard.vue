<template>
  <v-app>
    <v-main class="px-5 py-5 mt-12 background-main">
      <h2>Dashboard</h2>
      <div class="py-5 px-5 mt-3 white mb-1">
        <v-row class="mt-1">
          <v-col cols="12" sm="12" md="3" lg="3">
            <v-list>
              <v-list-item-group>
              <v-list-item-icon class="w-list-icon">
              <v-icon
                class="px-3 py-3 icon-set"
                x-large
                >
                mdi-parking
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="d-inline-block mt-3 ml-1 pb-0 item-pos">
                <v-list-item-subtitle>
                  <h2 class="font-weight-medium">330</h2>
                </v-list-item-subtitle>
                <v-list-item-title>
                  <h4 class="font-weight-regular pt-2">Parkir</h4>
                </v-list-item-title>
              </v-list-item-content>
              </v-list-item-group>
            </v-list>
          </v-col>

          <v-col cols="12" sm="12" md="3" lg="3">
            <v-list>
              <v-list-item-group>
              <v-list-item-icon class="w-list-icon">
              <v-icon
                class="px-3 py-3 icon-set"
                x-large
                >
                mdi-school-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="d-inline-block mt-3 ml-1 pb-0 item-pos">
                <v-list-item-subtitle>
                  <h2 class="font-weight-medium">55555</h2>
                </v-list-item-subtitle>
                <v-list-item-title>
                  <h4 class="font-weight-regular pt-2">Siswa</h4>
                </v-list-item-title>
              </v-list-item-content>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="12" sm="12" md="3" lg="3">
            <v-list>
              <v-list-item-group>
              <v-list-item-icon class="w-list-icon">
              <v-icon
                class="px-3 py-3 icon-set"
                x-large
                >
                fa fa-chalkboard-teacher
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="d-inline-block mt-3 ml-1 pb-0 item-pos">
                <v-list-item-subtitle>
                  <h2 class="font-weight-medium">201</h2>
                </v-list-item-subtitle>
                <v-list-item-title>
                  <h4 class="font-weight-regular pt-2">Guru</h4>
                </v-list-item-title>
              </v-list-item-content>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="12" sm="12" md="3" lg="3">
            <v-list>
              <v-list-item-group>
              <v-list-item-icon class="w-list-icon">
              <v-icon
                class="px-3 py-3 icon-set"
                x-large
                >
                mdi-help-circle-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="d-inline-block mt-3 ml-1 pb-0 item-pos">
                <v-list-item-subtitle>
                  <h2 class="font-weight-medium">324</h2>
                </v-list-item-subtitle>
                <v-list-item-title>
                  <h4 class="font-weight-regular pt-2">Tamu</h4>
                </v-list-item-title>
              </v-list-item-content>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
          <parkir-chart></parkir-chart>
          <v-row>
            <v-col cols="12" md="8" lg="8">
              <bar-chart></bar-chart>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <pie-chart></pie-chart>
            </v-col>
          </v-row>
      </div>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import BarChart from '../component/Chart/BarChart.vue';
import ParkirChart from '../component/Chart/ParkirChart'
import PieChart from '../component/Chart/PieChart.vue';
export default {
  components: { ParkirChart,PieChart, BarChart },
  name: "Dashboard",
  data: () => ({}),
};
</script>
