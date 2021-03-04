<template>
  <v-app class="px-5 py-5 mt-12 background-main"> 
      <h2>Data Siswa</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col lg="6" md="6" sm="12">
            <v-text-field
              filled
              rounded
              placeholder="Search Nis/Nama"
              prepend-inner-icon="mdi-magnify"
              v-model="search"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
        <v-data-table
          :headers="headers"
          :items="siswa"
          :search="search"
          sort-by="createdAt"
          sort-desc
          class="elevation-1"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        > 
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
                    <span class="headline">{{ editedItem.nis }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-form
                      v-model="valid"
                      ref="form"
                      lazy-validation
                      style="width: 100% !important"
                      >
                      <v-col cols="12" class="py-0">
                        <v-text-field 
                          v-if="formTitle != 'Edit Data Siswa'" 
                          v-model="editedItem.nis" label="NIS" 
                          outlined 
                          type="number"
                          :rules="nisRules" 
                          :counter="9"></v-text-field>
                        <v-text-field 
                          v-else 
                          v-model="editedItem.nis"  
                          label="NIS" 
                          type="number"
                          outlined disabled
                          :rules="nisRules"></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-text-field v-model="editedItem.nama" label="Nama Siswa" outlined :rules="nameRules"></v-text-field>
                      </v-col>
                      <v-col cols="12" v-if="formTitle != 'Edit Data Siswa'">
                        <v-text-field
                          label="Nomor SIM"
                          v-model="editedItem.noSIM"
                          outlined
                          :rules="simRules"
                          type="number"
                          :counter="14"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0" v-if="formTitle != 'Edit Data Siswa'">
                        <v-text-field
                          label="Nomor STNK"
                          v-model="editedItem.noSTNK"
                          outlined
                          :rules="stnkRules"
                          type="number"
                          :counter="8"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0" v-if="formTitle != 'Edit Data Siswa'">
                        <v-card-text>Jenis Kendaraan</v-card-text>
                        <v-chip-group
                          active-class="primary--text"
                          mandatory
                          v-model="editedItem.jenis"
                          :rules="jenisRules"
                          required
                        >
                          <v-chip value="motor">Motor</v-chip>
                          <v-chip value="mobil">Mobil</v-chip>
                        </v-chip-group>
                      </v-col>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="mr-6">
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text text-capitalize" depressed @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="primary" class="text-capitalize" dark @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="600px">
                <v-sheet
                  class="px-7 pt-7 white pb-4 mx-auto text-center d-inline-block"
                  dark
                >
                  <div class="black--text font-weight-bold text-heading-6 mb-4">
                    Apakah anda yakin ingin menghapus data ini ?
                  </div>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" class="mr-3" outlined @click="closeDelete"
                      ><strong>Cancel</strong></v-btn>
                    <v-btn color="red" @click="deleteItemConfirm"><v-icon>mdi-delete</v-icon><strong>DELETE</strong></v-btn>
                    <v-spacer></v-spacer>
                </v-sheet>
              </v-dialog>

              <v-dialog v-model="dialogDetails" max-width="700px">
                <v-card class="px-2">
                  <v-card-title>Detail Data</v-card-title>
                  <div>
                    <v-card-subtitle> Identitas Kendaraan</v-card-subtitle>
                    <!-- Tabel Identitas Kendaraan -->
                    <v-simple-table>
                      <template v-slot:default>
                        <thead class="orange">
                          <tr>
                            <th class="text-left">Id</th>
                            <th class="text-left">Nomor SIM</th>
                            <th class="text-left">Nomor STNK</th>
                            <th class="text-left">Tanggal Registrasi</th>
                            <th class="text-center">Jenis</th>
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
                            <th class="text-left">Id</th>
                            <th class="text-left">Jam Masuk</th>
                            <th class="text-left">Jam Keluar</th>
                            <th class="text-left">Jenis Kendaraan</th>
                            <th class="text-center">Status</th>
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
            </v-toolbar>
          </template>
          <template v-slot:[`item.createdAt`]="{ item }">
            {{ item.createdAt.replace(/[T]/g, ' ').slice(0, 11) }}
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
              
            ></v-pagination>
          </div>
        </div>
      </div> 
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
              <v-col cols="12" class="py-0">
                <v-text-field 
                  v-model="kendaraan.nis"
                  type="number" 
                  label="NIS"
                  :rules="nisRules"
                  :counter="9"
                  disabled
                  outlined></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  label="Nomor SIM"
                  :rules="simRules"
                  :counter="14"
                  v-model="kendaraan.noSIM"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  label="Nomor STNK"
                  :rules="stnkRules"
                  :counter="8"
                  v-model="kendaraan.noSTNK"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-card-text>Jenis Kendaraan</v-card-text>
                  <v-chip-group
                    active-class="primary--text"
                    mandatory
                    v-model="editedItem.jenis"
                    :rules="jenisRules"
                    required
                  >      
                    <v-chip value="motor">Motor</v-chip>
                    <v-chip value="mobil">Mobil</v-chip>
                  </v-chip-group>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="blue--text text-capitalize" depressed
              @click="closeKendaraan()"
            >
              Cancel
            </v-btn>
            <v-btn color="primary" class="text-capitalize" dark @click="saveKendaraan()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <router-view></router-view> 
  </v-app>
</template>

<script>
import SiswaService from "../services/SiswaService";
import KendaraanService from "../services/KendaraanService";

export default {
  name: "Student",

  components: {},

  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    valid: false,
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
      { text: "NIS", align: "start", value: "nis" },
      {
        text: "Nama Siswa",
        sortable: true,
        value: "nama",
      },
      { text: "Tgl Registrasi", value: "createdAt", filterable: false},
      { text: "Actions", value: "actions", sortable: false, align: "center"},
      { text: "", value: "action2", sortable: false},
    ],
    siswa: [],
    editedIndex: -1,
    editedItem: {
      nis: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: "",
      createdAt: null
    },
    defaultItem: {
      nis: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: "",
      createdAt: null
    },

    kendaraan: {
      nis: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: null,
      createdAt: null
    },

    defaultKendaraan: {
      nis: "",
      nama: "",
      noSIM: "",
      noSTNK: "",
      jenis: null,
      createdAt: null
    },

    nisRules: [
      v => !!v || 'NIS is required',
      v => (v && v.length == 9) || 'NIS must be 9 characters'
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

    valid_kendaraan: false

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Siswa" : "Edit Data Siswa";
    },
  },

  watch: {
    items(){
      this.progressBar = false
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

  created() {
    this.initialize();
  },
  mounted() {
    SiswaService.getAll()
      .then((res) => {
        this.siswa = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

  },

  methods: {
    initialize() {
      SiswaService.getAll()
        .then((res) => {
          this.siswa = res.data.data;
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
      this.editedIndex = this.siswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    detailsItem(item) {
      this.IdentitasKendaraan = item.kendaraans
      this.DataParkir = item.parkirs
      this.dialogDetails = true;
    },

    tambahKendaraan(item) {
      this.kendaraan = Object.assign({}, item);
      this.dialogKendaraan = true;
    },

    deleteItem(item) {
      this.editedIndex = this.siswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      SiswaService.delete(this.siswa[this.editedIndex].nis) 
        .then(res => {
          this.$swal({
            title: 'Berhasil',
            text: res.messages,
            icon: 'success',  
            showConfirmButton: false,
            timer: 1000               
          })
          this.siswa.splice(this.editedIndex, 1);
          this.closeDelete();
      
        }).catch(err => {
          this.$swal({
            title: 'Gagal',
            text: err.response.messages,
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

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeKendaraan() {
      this.dialogKendaraan = false;
      this.$nextTick(() => {
        this.kendaraan = Object.assign({}, this.defaultKendaraan);
      });
      
      this.$refs.form_kendaraan.reset()
      this.$refs.form_kendaraan.resetValidation()
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          SiswaService.edit(this.editedItem)
            .then(res => {
              this.$swal({
                title: 'Berhasil',
                text: res.messages,
                icon: 'success',  
                showConfirmButton: false,
                timer: 1000               
              })
              this.close();

            }).catch(err => {
              this.$swal({
                title: 'Gagal',
                text: err.response.messages,
                icon: 'error',                    
                showConfirmButton: false,
                timer: 1000
              })
            })

          Object.assign(this.siswa[this.editedIndex], this.editedItem);

        } else {
          
          this.editedItem.createdAt = new Date().getFullYear()+"-"+ new Date().getMonth()+"-"+ new Date().getDate()+"T"+ new Date().getHours()+":"+ new Date().getMinutes()+":"+ new Date().getSeconds()+".000Z"
          this.siswa.push(this.editedItem);

          SiswaService.add(this.editedItem)
            .then(res => {
              this.$swal({
                title: 'Berhasil',
                text: res.messages,
                icon: 'success',  
                showConfirmButton: false,
                timer: 1000               
              })
              this.close();

            }).catch(err => {
              this.$swal({
                title: 'Gagal',
                text: err.response.messages,
                icon: 'error',                    
                showConfirmButton: false,
                timer: 1000
              })
              this.siswa.splice(this.editedIndex, 1);
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
