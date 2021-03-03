<template>
  <v-app class="px-5 py-5 mt-12 background-main"> 
      <h2>Data guru</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col lg="6" md="6" sm="12">
            <v-text-field
              filled
              rounded
              placeholder="Search Nip/Nama"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
        <v-data-table
          :headers="headers"
          :items="guru"
          :search="search"
          sort-by="createdAt"
          sort-asc
          class="elevation-1"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.createdAt`]="{ item }">
            {{ item.createdAt.replace(/[TZ]/g, ' ').slice(0, 11) }}
          </template>
          <template v-slot:top>
            <v-toolbar class="toolbar-display" flat>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    TAMBAH
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-form
                      v-model="valid"
                      ref="form"
                      lazy-validation
                      style="width: 100% !important"
                      >
                      <v-col cols="12">
                        <v-text-field 
                          v-if="formTitle != 'Edit Data guru'" 
                          v-model="editedItem.nip"
                          type="number" 
                          label="NIP"
                          :rules="nipRules"
                          :counter="18"
                          outlined></v-text-field>
                        <v-text-field 
                          v-else 
                          :rules="nipRules"
                          :counter="18"
                          v-model="editedItem.nip" type="number" label="NIP" outlined disabled></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field 
                        v-model="editedItem.nama" 
                        :rules="nameRules"
                        label="Nama guru" outlined></v-text-field>
                      </v-col>
                      <v-col cols="12" v-if="formTitle != 'Edit Data guru'">
                        <v-text-field
                          label="Nomor SIM"
                          :rules="simRules"
                          :counter="14"
                          v-model="editedItem.noSIM"
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" v-if="formTitle != 'Edit Data guru'">
                        <v-text-field
                          label="Nomor STNK"
                          :rules="stnkRules"
                          :counter="8"
                          v-model="editedItem.noSTNK"
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" v-if="formTitle != 'Edit Data guru'">
                        <v-select
                          :items="jenis"
                          :rules="jenisRules"
                          label="Jenis Kendaraan"
                          v-model="editedItem.jenis"
                          outlined>
                        </v-select>
                      </v-col>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="primary" dark @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

                <v-dialog v-model="dialogDetails" max-width="700px">
                  <v-card class="px-2">
                    <v-card-title>Detail Data</v-card-title>
                    <div>
                      <v-card-subtitle> Identitas Kendaraan</v-card-subtitle>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead class="orange">
                            <tr>
                              <th class="text-left">ID</th>
                              <th class="text-left">Nomor STNK</th>
                              <th class="text-left">Nomor SIM</th>
                              <th class="text-left">Tanggal Registrasi</th>
                              <th class="text-left">Jenis Kendaraan</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in IdentitasKendaraan" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.no_sim }}</td>
                            <td>{{ item.no_stnk }}</td>
                            <td>{{ item.createdAt }}</td>
                            <td>
                              <v-chip v-if="item.jenis == 1">Motor</v-chip>
                              <v-chip v-else-if="item.jenis == 2">Mobil</v-chip>
                            </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                    <div>
                      <v-card-subtitle> History Parkir </v-card-subtitle>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead class="orange">
                            <tr>
                              <th class="text-left white--text">Tanggal</th>
                              <th class="text-left">Jam Masuk</th>
                              <th class="text-left">Jam Keluar</th>
                              <th class="text-left">Jenis Kendaraan</th>
                              <th class="text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in DataParkir" :key="item.id">
                              <td>{{ item.id }}</td>
                              <td>{{ item.masuk }}</td>
                              <td>{{ item.keluar }}</td>
                              <td>
                                <v-chip v-if="item.role == 1">Motor</v-chip>
                                <v-chip v-else-if="item.role == 2">Mobil</v-chip>
                              </td>
                              <td class="text-center">
                                <v-chip v-if="item.keluar == null" dark  color="red">Aktif</v-chip>
                                <v-chip v-else dark outlined color="red">Selesai</v-chip>                              
                              </td> 
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                    <v-card-subtitle> </v-card-subtitle>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      color="red"
                      class="rounded-circle"
                      outlined
                      absolute
                      text
                      @click="closeDetails"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil 
            </v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
            <v-btn 
              rounded 
              depressed 
              @click="detailsItem(item)">
              <v-icon left small color="primary">mdi-information</v-icon>
              Detail
            </v-btn>
          </template>
          <template v-slot:[`item.action2`]="{ item }">
            <v-btn 
              rounded
              color="teal"
              depressed
              dark
              class="ml-4"
              @click="tambahKendaraan(item)">
              <v-icon left small >mdi-plus</v-icon>
              <v-icon left >mdi-car-hatchback</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-data>
             No Data Found
          </template>
        </v-data-table>
        <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :length="pageCount"
              color="orange"
              tile
            ></v-pagination>
          </div>
        </div>
      </div>
      <!-- Dialog Tambah Kendaraan -->
      <v-dialog v-model="dialogKendaraan" max-width="700px">
        <v-card class="px-2">
          <v-card-title>Tambah Kendaraan</v-card-title>
          <v-card-text>
            <v-form
              v-model="valid_kendaraan"
              ref="form_kendaraan"
              lazy-validation
              style="width: 100% !important"
              >
              <v-col cols="12">
                <v-text-field 
                  v-model="kendaraan.nip"
                  type="number" 
                  label="NIP"
                  :rules="nipRules"
                  :counter="18"
                  disabled
                  outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor SIM"
                  :rules="simRules"
                  :counter="14"
                  v-model="kendaraan.noSIM"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor STNK"
                  :rules="stnkRules"
                  :counter="8"
                  v-model="kendaraan.noSTNK"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="jenis"
                  :rules="jenisRules"
                  label="Jenis Kendaraan"
                  v-model="kendaraan.jenis"
                  outlined>
                </v-select>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              class="mr-0"
              text
              @click="closeKendaraan()"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" dark @click="saveKendaraan()">
              Save
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>

  </v-app>
</template>

<script>
import GuruService from "../services/GuruService";
import KendaraanService from '../services/KendaraanService';
export default {
  name: "Teacher",

  components: {},

  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
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

    jenis: ['motor', 'mobil'],
  
    IdentitasKendaraan: [
    ],
    DataParkir: [
    ],

    search: "",
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    dialogKendaraan: false,
    headers: [
      { text: "NIP", align: "start", value: "nip" },
      {
        text: "Nama guru",
        sortable: true,
        value: "nama",
      },
      { text: "Tgl Registrasi", value: "createdAt", filterable: false },
      { text: "Actions", value: "actions", align: "center", sortable: false },
      { text: "", value: "action2", sortable: false },
    ],
    guru: [],
    editedIndex: -1,
    editedItem: {
      nip: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: null,
      createdAt: null
    },
    defaultItem: {
      nip: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: null,
      createdAt: null
    },

    kendaraan: {
      nip: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: null,
      createdAt: null
    },

    defaultKendaraan: {
      nip: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: null,
      createdAt: null
    },

    nipRules: [
      v => !!v || 'NIP is required',
      v => (v && v.length == 18) || 'NIP must be 18 characters'
    ],

    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length > 2) || 'Name must be more than 2 characters'
    ],
    simRules: [
      v => !!v || 'SIM is required',
      v => (v && v.length == 14) || 'SIM must be 14 characters'
    ],
    stnkRules: [
      v => !!v || 'STNK is required',
      v => (v && v.length == 8) || 'STNK must be 8 characters'
    ],
    jenisRules: [
      v => !!v || 'Jenis is required',
    ],
    valid: false,
    valid_kendaraan: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah guru" : "Edit Data guru";
    },
  },

  watch: {
    loading (val) {
        if (!val) return
        setTimeout(() => (this.loading = false), 3000)
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogDetails(val) {
      val || this.closeDetails();
    },
    dialogKendaraan(val) {
      val || this.closeKendaraan();
    },
  },
  mounted() {
    GuruService.getAll()
      .then((res) => {
        this.guru = res.data.data;
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
  },

  methods: {
    initialize() {
      GuruService.getAll()
        .then((res) => {
          this.guru = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColor(status) {
      if (status == "Selesai") return "green";
      else if (status == "Aktif") return "blue";
    },

    editItem(item) {
      this.editedIndex = this.guru.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    tambahKendaraan(item) {
      this.kendaraan = Object.assign({}, item);
      this.dialogKendaraan = true;
    },

    detailsItem(item) {
      this.IdentitasKendaraan = item.kendaraans
      this.DataParkir = item.parkirs
      this.dialogDetails = true;
    },

    deleteItem(item) {
      this.editedIndex = this.guru.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      GuruService.delete(this.guru[this.editedIndex].nip) 
        .then(res => {
          this.$swal({
            title: 'Berhasil',
            text: res.data.messages,
            icon: 'success',  
            showConfirmButton: false,
            timer: 1000               
          })
          this.guru.splice(this.editedIndex, 1);
          this.closeDelete();
        }).catch(err => {
          this.$swal({
            title: 'Gagal',
            text: err.response.data.messages,
            icon: 'error',                    
            showConfirmButton: false,
            timer: 1000
          })
        })
      
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });

      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },

    closeDetails() {
      this.dialogDetails = false;
    },

    closeKendaraan() {
      this.dialogKendaraan = false;
      this.$nextTick(() => {
        this.kendaraan = Object.assign({}, this.defaultKendaraan);
      });
      
      this.$refs.form_kendaraan.reset()
      this.$refs.form_kendaraan.resetValidation()
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          GuruService.edit(this.editedItem)
            .then(res => {
              this.$swal({
                title: 'Berhasil',
                text: res.data.messages,
                icon: 'success',  
                showConfirmButton: false,
                timer: 1000               
              })
              this.close();

            }).catch(err => {
              this.$swal({
                title: 'Gagal',
                text: err.response.data.messages,
                icon: 'error',                    
                showConfirmButton: false,
                timer: 1000
              })
            })
  
          Object.assign(this.guru[this.editedIndex], this.editedItem);
  
        } else {
  
          this.editedItem.createdAt = new Date().getFullYear()+"-"+ new Date().getMonth()+"-"+ new Date().getDate()+"T"+ new Date().getHours()+":"+ new Date().getMinutes()+":"+ new Date().getSeconds()+".000Z"
          this.guru.push(this.editedItem);
  
          GuruService.add(this.editedItem)
            .then(res => {
              this.$swal({
                title: 'Berhasil',
                text: res.data.messages,
                icon: 'success',  
                showConfirmButton: false,
                timer: 1000               
              })
              this.close();
              this.initialize()
            }).catch(err => {
              console.log(err)
              this.$swal({
                title: 'Gagal',
                text: err.response.data.messages,
                icon: 'error',                    
                showConfirmButton: false,
                timer: 1000
              })
              this.guru.splice(this.editedIndex, 1);
            })
        }
        
      }
    },

    saveKendaraan() {
      if (this.$refs.form_kendaraan.validate()) {
        KendaraanService.add(this.kendaraan)
          .then(res => {
            this.$swal({
              title: 'Berhasil',
              text: res.data.messages,
              icon: 'success',  
              showConfirmButton: false,
              timer: 1000               
            })
            this.closeKendaraan();
            this.initialize()
          }).catch(err => {
            console.log(err)
            this.$swal({
              title: 'Gagal',
              text: err.response.data.messages,
              icon: 'error',                    
              showConfirmButton: false,
              timer: 1000
            })
          })
      }
    }
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>