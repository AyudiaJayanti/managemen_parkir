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
            <h3 class="font-weight-medium mt-3">Pengguna</h3>
            <div class="row px-3">
              <div class="col-md-3 col-sm-12 mr-md-2 white box-data">
                <header class=" text--secondary">User</header>
                <h1 class="font-weight-bold">{{ user }}</h1>
              </div>
              <div class="col-md-3 col-sm-12 mr-md-2 white box-data">
                <header>Guru</header>
                <h1 class="font-weight-bold">{{ guru }}</h1>
              </div>
              <div class="col-md-3 col-sm-12 mr-md-2 white box-data">
                <header>Siswa</header>
                <h1 class="font-weight-bold">{{ siswa }}</h1>
              </div> 
              <div class="col-md-3 white box-data">
                <header>Tamu</header>
                <h1 class="font-weight-bold">{{ tamu }}</h1>
              </div>
            </div>
            <h3 class="font-weight-medium mt-3">Statistik Parkir Minggu Ini</h3>

    <div class="row">
      <v-col cols="3">
        <v-alert border="left" colored-border color="black" elevation="2">
          <v-list-item>
            <v-list-item-content>
              <header class="text--secondary">User</header>
              <h1 class="font-weight-bold mt-1">{{ user }}</h1>
            </v-list-item-content>
            <v-btn outlined x-large fab color="black">
              <v-icon>mdi-account-check-outline</v-icon>
            </v-btn>
          </v-list-item>
        </v-alert>
      </v-col>

      <v-col cols="3">
        <v-alert
          border="left"
          colored-border
          color="deep-purple accent-4"
          elevation="2"
        >
          <v-list-item>
            <v-list-item-content>
              <header class="text--secondary">Guru</header>
              <h1 class="font-weight-bold mt-1">{{ guru }}</h1>
            </v-list-item-content>
            <v-btn outlined x-large fab color="indigo">
              <v-icon>fa fa-chalkboard-teacher</v-icon>
            </v-btn>
          </v-list-item>
        </v-alert>
      </v-col>

      <v-col cols="3">
        <v-alert border="left" colored-border color="teal" elevation="2">
          <v-list-item>
            <v-list-item-content>
              <header class="text--secondary">Siswa</header>
              <h1 class="font-weight-bold mt-1">{{ siswa }}</h1>
            </v-list-item-content>
            <v-btn outlined x-large fab color="teal">
              <v-icon>mdi-school-outline</v-icon>
            </v-btn>
          </v-list-item>
        </v-alert>
      </v-col>

      <v-col cols="3">
        <v-alert border="left" colored-border color="cyan" elevation="2">
          <v-list-item>
            <v-list-item-content>
              <header class="text--secondary">Tamu</header>
              <h1 class="font-weight-bold mt-1">{{ tamu }}</h1>
            </v-list-item-content>
            <v-btn outlined x-large fab color="cyan">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>
          </v-list-item>
        </v-alert>
      </v-col>
    </div>
    <div class="row" fluid>
      <div class="col-md-8 col-sm-12 col-lg-8">
        <div>
          <h3 class="font-weight-medium">Statistik Parkir Minggu Ini</h3>
          <div class="white">
            <parkir-chart></parkir-chart>
          </div>
          <div class="col-md-4 col-sm-12 col-lg-4">
            <div class="white box-style-scd">
              <!-- Bar Chart -->
              <div class="mt-3">
                <h6 class="font-weight-medium">Kendaraan Terdaftar</h6>
                <h2>{{kendaraan}}</h2>
              <!-- <bars
                :data="[5, 1, 7, 5, 6, 4, 10, 8, 6, 4, 10, 8 ]"
                :gradient="['#ffbe88', '#ff93df']"
                :barWidth="5.9"
                :rounding="2.7"    
                :growDuration="1"
                style="height: 50%; width 30%"
                >
              </bars> -->
            </div>
            <!-- Donat Chart -->
            <div class="mt-6">
              <h3 class="mb-3">Statistik Parkir Minggu Ini</h3>
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
        <v-alert elevation="2" class="mt-3">
          <v-list-item>
            <v-list-item-content>
              <header class="text--secondary">Kendaraan</header>
              <h1 class="font-weight-bold mt-1">{{ kendaraan }}</h1>
            </v-list-item-content>
            <v-btn outlined x-large fab color="cyan">
              <v-icon>mdi-car</v-icon>
            </v-btn>
          </v-list-item>
        </v-alert>
      </div>
    </div>
    <v-simple-table class="mt-12">
      <template v-slot:default>
        <thead>
          <tr class="oren">
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in user_list" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <router-view></router-view>
  </v-app>
</template>
<script>
import DoughnutChart from "../component/Chart/DoughnutChart.vue";
import ParkirChart from "../component/Chart/ParkirChart.vue";

import GuestSevice from "../services/GuestService";
import GuruService from "../services/GuruService";
import KendaraanService from "../services/KendaraanService";
import ParkirService from "../services/ParkirService";
import SiswaService from "../services/SiswaService";
import UsersService from "../services/UsersService";

export default {
  components: { DoughnutChart, ParkirChart },
  name: "Dashboard",
  data: () => ({
    siswa: null,
    guru: null,
    parkir: null,
    user: null,
    kendaraan: null,
    tamu: null,
    user_list: [],

    defaultItem: {
      id: "",
      name: "",
      email: "",
      role: "",
      password: "",
    },
  }),
  mounted() {
    GuestSevice.getAll()
      .then((res) => {
        this.tamu = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });

    UsersService.getAll()
      .then((res) => {
        this.user = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });

    SiswaService.getAll()
      .then((res) => {
        this.siswa = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });

    ParkirService.getAll()
      .then((res) => {
        this.parkir = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });

    KendaraanService.getAll()
      .then((res) => {
        this.kendaraan = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });

    GuruService.getAll()
      .then((res) => {
        this.guru = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });

    UsersService.getAll()
      .then((res) => {
        this.user_list = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
