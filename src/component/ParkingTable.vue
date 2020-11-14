<template>
  <v-data-table
    :headers="headers"
    :items="dataparkir"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'ID (NIS/NIP)',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Nama', value: 'name' },
          { text: 'Status', value: 'status' },
          { text: 'Tanggal Masuk', value: 'tglmasuk' },
          { text: 'Jam Masuk', value: 'jammasuk' },
          { text: 'Jam Keluar', value: 'jamkeluar' },
        ],
        dataparkir: [
          {
            id: 1811138,
            name: 'Candra',
            status: 'Siswa',
            tglmasuk: '21-07-2020',
            jammasuk: '06:32AM',
            jamkeluar: '04:00PM',
          },
          {
            id: 1111111,
            name: 'Rudi Rahmayadi',
            status: 'Guru',
            tglmasuk: '29-08-2020',
            jammasuk: '08:45AM',
            jamkeluar: '13:00PM',
          },
        ],
      }
    },
  }
</script>