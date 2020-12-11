<template>
  <v-app class="px-5 py-5 mt-12 background-main">
      <h1>Dashboard</h1>
        <div class="row" fluid>
          <div class="col-md-8 col-sm-12 col-lg-8 px-0">
            <div class="box-style-pad">
            <div class="white box-style px-10 py-3">
              <h2 class="welcome-text my-5">Welcome Back, {{ this.$session.get('name') }}</h2>
              <img src="../assets/hallo.svg" class="img-size">
            </div>
            <h2 class="font-weight-medium mt-3">Parkir Data</h2>
            <div class="row px-3">
              <div class="col-md-3 col-sm-12 mr-md-2 white box-data">
                <header class=" text--secondary">User</header>
                <h1 class="font-weight-bold">10</h1>
              </div>
              <div class="col-md-3 col-sm-12 mr-md-2 white box-data">
                <header>Guru</header>
                <h1 class="font-weight-bold">15</h1>
              </div>
              <div class="col-md-3 col-sm-12 mr-md-2 white box-data">
                <header>Siswa</header>
                <h1 class="font-weight-bold">7</h1>
              </div> 
              <div class="col-md-3 white box-data">
                <header>Tamu</header>
                <h1 class="font-weight-bold">12</h1>
              </div>
            </div>
            <div class="white line-style">
              <parkir-chart style="height:100%"></parkir-chart>
            </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-12 col-lg-4">
            <div class="white box-style-scd">
              <!-- Bar Chart -->
              <div class="mt-3">
                <h6 class="font-weight-medium">Jumlah Kendaraan</h6>
                <h2>20</h2>
              <bars
                :data="[5, 1, 7, 5, 6, 4, 10, 8, 6, 4, 10, 8 ]"
                :gradient="['#ffbe88', '#ff93df']"
                :barWidth="5.9"
                :rounding="2.7"    
                :growDuration="1"
                style="height: 50%; width 30%"
                >
              </bars>
            </div>
            <!-- Donat Chart -->
            <div class="mt-6">
              <h3 class="mb-3">User Data</h3>
              <doughnut-chart ></doughnut-chart>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-banner class="pb-2">
                      <v-list-item-title class="font-weight-bold d-inline">Guru</v-list-item-title>
                      <v-list-item-subtitle class="d-inline sub-item">15%</v-list-item-subtitle>
                    </v-banner>
                    <v-banner class="pb-2">
                      <v-list-item-title class="font-weight-bold d-inline">Siswa</v-list-item-title>
                      <v-list-item-subtitle class="d-inline sub-item">30%</v-list-item-subtitle>
                    </v-banner>
                    <v-banner class="pb-2">
                      <v-list-item-title class="font-weight-bold d-inline">Tamu</v-list-item-title>
                      <v-list-item-subtitle class="d-inline sub-item">65%</v-list-item-subtitle>
                    </v-banner>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            </div>
          </div>
        </div>
      <router-view></router-view>
  </v-app>
</template>
<script>
import DoughnutChart from '../component/Chart/DoughnutChart.vue';
import ParkirChart from '../component/Chart/ParkirChart.vue';
export default {
  components: {DoughnutChart, ParkirChart },
  name: "Dashboard",
  data: () => ({}),
};
</script>
