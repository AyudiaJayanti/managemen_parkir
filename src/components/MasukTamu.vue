<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card class="pa-10" style=""> 
        <v-card-title>Data Tamu</v-card-title>
        <v-card-subtitle>Isi Data Untuk Parkir</v-card-subtitle>
        <v-form
          v-model="valid">
          <v-text-field
            label="Nama"
            prepend-icon="mdi-account"
            v-model="tamu.nama"
            required
            :rules="nameRules"
          ></v-text-field>
          <v-select
            :items="instansi"
            prepend-icon="mdi-domain"
            label="Instansi"
            v-model="tamu.instansi"
            required
            :rules="instansiRules"
            ></v-select>
          <v-select
            :items="jenis"
            prepend-icon="mdi-car"
            label="Jenis Kendaraan"
            v-model="tamu.jenis"
            :rules="jenisRules"
            required></v-select>

        </v-form>
        <v-card-actions align="right">
         <v-row
            align="center"
            justify="end"
          >
            <v-btn depressed @click="clear">
              Cancel
            </v-btn>
            <v-btn depressed class="ml-3" color="primary" @click="submit">
              Submit
            </v-btn>
          </v-row>
        </v-card-actions>

      </v-card>
      
    </v-row>
  </v-container>
</template>

<style type="text/css">
</style>

<script>
import GuestService from "../services/GuestService";

export default {
    name: 'MasukTamu',
    created() {
      console.log("Hi")
    },
    data() {
      return {
        tamu: {
          nama: '',
          instansi: '',
          jenis: '',
        },  
        instansi: ["Orangtua", "Perusahaan", "Sekolah", "Umum"],
        jenis: ['motor', 'mobil'],
        valid: false,
        snackbar: false,
        nameRules: [
          v => !!v || 'Name is required',
        ],
        instansiRules: [
          v => !!v || 'Instansi is required',
        ],
        jenisRules: [
          v => !!v || 'Jenis is required',
        ],

      }
    },
    methods: {
      submit() {
        GuestService.add(this.tamu)
          .then(res => {
            this.$swal({
              title: 'Berhasil',
              text: res.data.message,
              icon: 'success',  
              showConfirmButton: false,
              timer: 1000               
            })
            this.clear()
          })
          .catch(err => {
            this.$swal({
              title: 'Gagal',
              text: err.res.data.message,
              icon: 'error',  
              showConfirmButton: false,
              timer: 1000               
            })
          })
      },

      clear () {
        this.tamu.nama = ''
        this.tamu.instansi = ''
        this.tamu.jenis = ''
      },

    },
}
</script>