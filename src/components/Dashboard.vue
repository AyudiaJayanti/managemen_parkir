<template>
  <v-app class="px-5 py-5 mt-12 background-main">
    <v-alert
      dismissible
      dense
      color="teal"
      icon="mdi-clock-fast"
      border="left"
      position="absolute"
    >
      Welcome back, {{ this.$session.get("name") }}
    </v-alert>
    <h1>Dashboard</h1>

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
        </div>
      </div>
      <div class="col-md-4 col-sm-12 col-lg-4">
        <h3 class="font-weight-medium">Perbandingan</h3>
        <div class="white mb-3">
          <!-- Donat Chart -->
          <div class="pb-4 pt-4">
            <doughnut-chart></doughnut-chart>
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
