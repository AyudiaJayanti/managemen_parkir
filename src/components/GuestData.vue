<template>
  <v-app>
    <v-main style="padding: 20px 64px">
      <v-row>
        <v-col lg="6" md="6" sm="12">
          <v-text-field
            filled
            rounded
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
          >
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
        <br />
        <GuestTable />
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
    items: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September",
    "Oktober", "November", "Desember"],
  }),
};
</script>
