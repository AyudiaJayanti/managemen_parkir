<template>
  <v-app class="px-5 py-5 mt-12 background-main"> 
      <h2>Data parkir</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col lg="5" md="5" sm="12">
            <v-text-field
              filled
              rounded
              placeholder="Search ID"
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              single-line
            ></v-text-field>
          </v-col>
          <v-col lg="6" md="6" sm="12">
            <v-form
              style="width: 100% !important"
              ref="form"
              lazy-validation
              v-model="valid"
              >
              <v-row>
                <v-col lg="6" md="6" sm="12" class="ma-0 pa-0">
                  <v-select
                    :items="items"
                    :rules="bulanRules"
                    label="Bulan"
                    solo
                    v-model="download.bulan"
                    rounded
                    placeholder="Bulan" 
                    @input="filterData(download.bulan, download.tahun)"
                    background-color="#E5E5E5"
                  ></v-select>
                </v-col>
                <v-col lg="5" md="5" sm="12" class="ml-md-4 my-0 pa-0">
                  <v-select
                    v-model="download.tahun"
                    :items="tahun"
                    :rules="tahunRules"
                    placeholder="Tahun" 
                    label="Tahun"
                    solo
                    @change="filterData(download.bulan, download.tahun)"
                    rounded
                    background-color="#E5E5E5"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col lg="1" md="1" sm="12">
            <v-btn rounded small fab color="primary" dark @click="initialize()">
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="parkir"
          :search="search"
          ref="content"
          sort-by="masuk"
          sort-desc
          class="elevation-1"
        >
          <template v-slot:[`item.nama`]="{ item }">
            <td v-if="item.siswa != null">{{item.siswa.nama}}</td>
            <td v-else-if="item.guru != null">{{item.guru.nama}}</td>
            <td v-else-if="item.tamu != null">{{item.tamu.nama}}</td>
          </template>
          <template v-slot:[`item.masuk`]="{ item }">
            {{ item.masuk != null? item.masuk.replace(/[T]/g, ' ').slice(0, 19) : item.masuk }}
          </template>
          <template v-slot:[`item.keluar`]="{ item }">
            {{ item.keluar != null? item.keluar.replace(/[TZ]/g, ' ').slice(0, 19) : item.keluar}}
          </template>
          <template v-slot:[`item.visitor_id`]="{ item }">
            <v-btn v-if="item.tamu != null" color="cyan" dark rounded @click="detailsItem(item)">Tamu</v-btn>
            <v-btn v-if="item.guru != null" color="teal" dark rounded @click="detailsItem(item)">Guru</v-btn>
            <v-btn v-if="item.siswa != null" color="purple" dark rounded @click="detailsItem(item)">Siswa</v-btn>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip v-if="item.keluar == null" dark color="red">Aktif</v-chip>
            <v-chip v-else dark outlined color="red">Selesai</v-chip>
          </template>
          <template v-slot:[`item.role`]="{ item }">
            <v-chip color="white">{{ item.role == 1 ? "Motor" : "Mobil"}}</v-chip>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize()"> Reset </v-btn>
          </template>
        </v-data-table>
      </div> 
      <v-dialog v-model="dialogDetails" max-width="500">
        <v-card class="pt-5 px-8">
      
          <v-row align="center" justify="center" class="mb-5">
            <v-avatar v-if="this.title == 'Siswa'" size="75" color="purple" ><v-icon size="40" color="white">mdi-school-outline</v-icon></v-avatar>
            <v-avatar v-else-if="this.title == 'Guru'" size="75" color="teal" ><v-icon size="30" color="white">fa fa-chalkboard-teacher</v-icon></v-avatar>
            <v-avatar v-else-if="this.title == 'Tamu'" size="75" color="cyan" ><v-icon size="40" color="white">mdi-help-circle-outline</v-icon></v-avatar>
            <v-chip label style="position: absolute; right: 10px; top: 10px" class="mx-2 my-2">{{ this.title }}</v-chip>
          </v-row>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr v-for="(item, index) in detailParkir" :key="item.name">
                  <th >{{ index }}</th>
                  <th >:</th>
                  <th >{{ item }}</th>
                </tr>
              </thead>
            </template>
          </v-simple-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDetails"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="orange"
            right
            fixed
            fab
            dark
            bottom
            class="ma-7"
            @click="download_laporan()"
          >
            <v-icon> mdi-arrow-collapse-down </v-icon>
          </v-btn>
        </template>
        <span v-if="typeof this.parkir !== 'undefined' && this.parkir.length > 0">{{ (download.bulan != '' && download.tahun != '') ? 'Download ' + download.bulan + ' ' + download.tahun : 'Pilih Bulan dan Tahun'}}</span>
        <span v-else>Data Kosong</span> 
      </v-tooltip>
      <v-snackbar v-model="snackbar">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
      <router-view></router-view> 
  </v-app>
</template>

<script>
import ParkirService from "../services/ParkirService";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// import html2canvas from 'html2canvas'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
// const d = new Date();

export default {
  name: "Student",
  components: {},

  data: () => ({
    snackbar: false,
    message: '',
    bulanRules: [
      v => !!v || 'Bulan is required',
    ],
    tahunRules: [
      v => !!v || 'Tahun is required',
    ],
    title: '',
    valid: false,
    detailParkir: [],
    items: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    tahun: [
      2019,
      2020,
      2021
    ],
    
    download: {
      bulan: 0,
      tahun: 0,
    },
      
    IdentitasKendaraan: [
      
    ],

    search: "",
    dialogDetails: false,
    headers: [
      { text: "Id", align: "start", value: "id" },
      {
        text: "Nama",
        sortable: true,
        value: "nama",
        filterable: false
      },
      { text: "Detail", value: "visitor_id", align:"center", filterable: false},
      { text: "Jenis", align: "center", value: "role", filterable: false},
      { text: "Tanggal Masuk", value: "masuk", sortable: true, filterable: false },
      { text: "Tanggal Keluar", value: "keluar", sortable: true, filterable: false },
      { text: "Status", align: "center", value: "status" , filterable: false},
    ],
    parkir: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah parkir" : "Edit Data parkir";
    },
  },

  watch: {
    dialogDetails(val) {
      val || this.closeDetails();
    },
  },

  mounted() {
    ParkirService.getAll()
      .then((res) => {
        this.parkir = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    initialize() {
      this.download.bulan = 0
      this.download.tahun = 0
      this.search = ''

      this.$refs.form.resetValidation()

      ParkirService.getAll()
        .then((res) => {
          this.parkir = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColor(status) {
      if (status == "Selesai") return "green";
      else if (status == "Aktif") return "blue";
    },
    closeDetails() {
      this.dialogDetails = false
    },
    detailsItem(item) {
      this.editedIndex = this.parkir.indexOf(item);

      if (item.siswa != null) {
        this.title = "Siswa"
        this.detailParkir = item.siswa;
      }
      else if (item.guru != null) {
        this.title = "Guru"
        this.detailParkir = item.guru;
      }
      else if (item.tamu != null){
        this.title = "Tamu"
        this.detailParkir = item.tamu;
      } 

      this.dialogDetails = true;
    },
    filterData(bulan, tahun) {
      if(this.$refs.form.validate()) {
        var from = new Date(tahun, this.items.indexOf(bulan), 1)
        var to = new Date(tahun, this.items.indexOf(bulan) + 1, 1)
  
        ParkirService.laporan(from, to)
          .then(res => {
            this.parkir = res.data.data;
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    download_laporan() {

      if(this.$refs.form.validate()){
        if(typeof this.parkir !== 'undefined' && this.parkir.length > 0) {

          // var source =  this.$refs["content"];
          let rows = [];
          let columnHeader = ['ID', 'Jenis', 'Nama', 'Role', 'Tgl Masuk', 'Jam Masuk', 'Tgl Keluar', 'Jam Keluar', 'Status'];
          let pdfName = 'LAPORAN_PARKIR_'+(this.items.indexOf(this.download.bulan) + 1)+'/'+this.download.tahun;
          var tamu = 0
          var guru = 0
          var siswa = 0

          this.parkir.forEach(element => {
            var temp = []
            if(element.siswa != null) {
              siswa++
              temp = [
                element.id,
                element.role == 1? 'Motor' : 'Mobil',
                element.siswa.nama,
                'Siswa',
                element.masuk != null? element.masuk.replace(/[T]/g, ' ').slice(0, 11) : element.masuk,
                element.masuk != null? element.masuk.replace(/[T]/g, ' ').slice(10, 19) : element.masuk,
                element.keluar != null? element.keluar.replace(/[T]/g, ' ').slice(0, 11) : element.keluar,
                element.keluar != null? element.keluar.replace(/[T]/g, ' ').slice(10, 19) : element.keluar,
                element.keluar == null? 'Aktif' : 'Selesai'
              ];
            } else if(element.guru != null) {
              guru++
              temp = [
                element.id,
                element.role == 1? 'Motor' : 'Mobil',
                element.guru.nama,
                'Guru',
                element.masuk != null? element.masuk.replace(/[T]/g, ' ').slice(0, 11) : element.masuk,
                element.masuk != null? element.masuk.replace(/[T]/g, ' ').slice(10, 19) : element.masuk,
                element.keluar != null? element.keluar.replace(/[T]/g, ' ').slice(0, 11) : element.keluar,
                element.keluar != null? element.keluar.replace(/[T]/g, ' ').slice(10, 19) : element.keluar,
                element.keluar == null? 'Aktif' : 'Selesai'
              ];
            } else if(element.tamu != null) {
              tamu++
              temp = [
                element.id,
                element.tamu == 1? 'Motor' : 'Mobil',
                element.tamu.nama,
                'Tamu',
                element.masuk != null? element.masuk.replace(/[T]/g, ' ').slice(0, 11) : element.masuk,
                element.masuk != null? element.masuk.replace(/[T]/g, ' ').slice(10, 19) : element.masuk,
                element.keluar != null? element.keluar.replace(/[T]/g, ' ').slice(0, 11) : element.keluar,
                element.keluar != null? element.keluar.replace(/[T]/g, ' ').slice(10, 19) : element.keluar,
                element.keluar == null? 'Aktif' : 'Selesai'
              ];
            }
            rows.push(temp);
          });

          var doc = new jsPDF();
          doc.text(15, 20, 'LAPORAN PARKIR')
          doc.setFontSize(9);
          doc.text(15, 25, this.download.bulan.toUpperCase() + ' ' +this.download.tahun)

          doc.autoTable(columnHeader, rows, { startY: 35 });

          doc.text(15, doc.autoTable.previous.finalY + 10, 'Jumlah : ' + this.parkir.length)
          doc.text(15, doc.autoTable.previous.finalY + 15, 'Guru : ' + guru)
          doc.text(15, doc.autoTable.previous.finalY + 20, 'Siswa : ' + siswa)
          doc.text(15, doc.autoTable.previous.finalY + 25, 'Tamu : ' + tamu)

          var date = new Date();
          doc.text(140, doc.autoTable.previous.finalY + 10, 'Tanggal Download : ' +date.getDate()+' '+monthNames[date.getMonth()-1]+' '+date.getFullYear())

          doc.text(140, doc.autoTable.previous.finalY + 20, 'ID Admin : ' + this.$session.get('id'))
          doc.text(140, doc.autoTable.previous.finalY + 25, 'Nama Admin : ' + this.$session.get('name'))
          doc.save(pdfName + '.pdf');


          this.message = 'Downloaded'
          this.snackbar = true
        } else {
          this.message = 'Data Kosong'
          this.snackbar = true
        }
      } else {
        this.message = 'Pilih Bulan dan Tahun Terlebih Dahulu'
        this.snackbar = true
      }
    }
  },
  
};
</script>
