<template>
  <v-app>
    <v-main class="pr-5 pl-5 pt-5 pb-5 background-main">
      <h2>Data Tamu</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col lg="6" md="6" sm="12">
            <v-text-field
              filled
              rounded
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col lg="3" md="3" sm="12">
            <v-select
              :items="items"
              label="Bulan"
              solo
              rounded
              background-color="#E5E5E5"
            ></v-select>
          </v-col>
        </v-row>
        <GuestTable />
      </div>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import GuestTable from "../component/GuestTable";

export default {
  name: "Guest",

  components: {
    GuestTable,
  },
  data: () => ({
    items: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  }),
};
</script>
