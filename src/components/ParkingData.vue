<template>
  <v-app  class="px-5 py-5 mt-12 background-main">
      <h2>Data Parkir</h2>
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
        <v-simple-table height="50vh" style="position: relative">
          <template v-slot:default>
            <thead class="orange">
              <tr>
                <th class="text-left white--text">ID(NIS/NIP)</th>
                <th class="text-left">Nama</th>
                <th class="text-left">Role</th>
                <th class="text-left">Tanggal Masuk</th>
                <th class="text-left">Jam Masuk</th>
                <th class="text-left">Jam Keluar</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in DataParkir" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.tglmasuk }}</td>
                <td>{{ item.jammasuk }}</td>
                <td>{{ item.jamkeluar }}</td>
                <td class="text-center" >
                  <v-chip
                    :color="getColor(item.status)"
                    dark
                  >
                    {{ item.status }}
                  </v-chip>
                   
                </td>
                
              </tr>
              <v-tooltip top>
                <span>Download Bulan Agustus</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="orange"
                    right
                    absolute
                    fab
                    dark
                    style="bottom: 20px"
                  >
                    <v-icon> mdi-arrow-collapse-down </v-icon>
                  </v-btn>
                </template>
                <span>Download Bulan Agustus</span>
              </v-tooltip>
            </tbody>
          </template>
        </v-simple-table>
        
      </div>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "Parking",

  components: {
  },

  methods: {
    getColor (status) {
        if (status == "Selesai") return 'green'
        else if (status == "Aktif") return 'blue'
    },
  },

  data: () => ({
        DataParkir: [
          {
            id: 1811138,
            nama: 'Candra',
            role: 'Siswa',
            tglmasuk: '21-07-2020',
            jammasuk: '06:32AM',
            jamkeluar: '04:00PM',
            status: "Aktif"
          },
          {
            id: 1111111,
            nama: 'Rudi Rahmayadi',
            role: 'Guru',
            tglmasuk: '29-08-2020',
            jammasuk: '08:45AM',
            jamkeluar: '13:00PM',
            status: "Selesai"
          },
        ],
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
