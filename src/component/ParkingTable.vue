<template>
  <v-simple-table 
  height="50vh"
  style="position: relative">
    <template v-slot:default>
      <thead class="orange">
        <tr>
          <th class="text-left white--text">
            ID(NIS/NIP)
          </th>
          <th class="text-left">
            Nama
          </th>
          <th class="text-left">
            Role
          </th>
          <th class="text-left">
            Tanggal Masuk
          </th>
          <th class="text-left">
            Jam Masuk
          </th>
          <th class="text-left">
            Jam Keluar
          </th>
          <th class="text-left">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in DataParkir"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.role }}</td>
          <td>{{ item.tglmasuk }}</td>
          <td>{{ item.jammasuk }}</td>
          <td>{{ item.jamkeluar }}</td>
          <td class="text-center "><v-btn class="white--text font-weight-light" color="blue" height="20px" style="font-size: 0.5rem;" rounded>{{ item.status }}</v-btn></td>
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
          <v-icon>
            mdi-arrow-collapse-down
          </v-icon>
        </v-btn>
      </template>
      <span>Download Bulan Agustus</span>
    </v-tooltip>
      </tbody>
      
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        bottom: "100px",
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
      }
    },
  }
</script>
<style>
.text-color{
  color: white !important
}
.btn-position{
  position: absolute;
  right: 0 !important;
  border-radius: 50%;
}
</style>