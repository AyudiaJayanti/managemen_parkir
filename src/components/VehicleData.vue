<template>
  <v-app class="px-5 py-5 mt-12 background-main"> 
      <h2>Data Kendaraan</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col lg="6" md="6" sm="12">
            <v-text-field
              filled
              rounded
              placeholder="Search ID/SIM/STNK/NIS/NIP"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
        <v-data-table
          :headers="headers"
          :items="kendaraan"
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
            <v-toolbar class="" flat>
              <v-dialog v-model="dialog" max-width="600px">
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
                        <v-text-field v-if="formTitle != 'Tambah kendaraan'" v-model="editedItem.id" type="phone" label="ID" disabled outlined></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.no_sim" :rules="simRules" :counter="14" label="Nomor SIM" outlined></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.no_stnk" :rules="stnkRules" :counter="8" label="Nomor STNK" outlined></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="jenis"
                          :rules="jenisRules"
                          label="Jenis Kendaraan"
                          v-model="editedItem.jenis"
                          item-text="name" 
                          item-value="nilai"
                          outlined>
                        </v-select>
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
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil 
            </v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:[`item.jenis`]="{ item }">
            <v-chip color="white">{{ item.jenis == 1 ? "Motor" : "Mobil"}}</v-chip>
          </template>
          <template v-slot:[`item.owner_id`]="{ item }">
            <v-btn v-if="item.guru != null" color="teal" dark rounded @click="detailsItem(item)">Guru</v-btn>
            <v-btn v-else-if="item.siswa != null" color="purple" dark rounded @click="detailsItem(item)">Siswa</v-btn>
            <v-btn v-else outlined color="grey" dark rounded>Deleted</v-btn>
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
                <tr v-for="(item, index) in detailParkir" :key="item.id">
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
      <router-view></router-view> 
  </v-app>
</template>

<script>
import KendaraanService from "../services/KendaraanService";
export default {
  name: "Vehicle",
  components: {},

  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
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
    title: '',
    detailParkir: [],
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

    jenis: [ 
      {
        name: "motor",
        nilai: 1
      },
      {
        name: "mobil",
        nilai: 2
      }
    ],
  
    IdentitasKendaraan: [
    ],
    DataParkir: [
    ],

    search: "",
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      { text: "Id", align: "center", value: "id" },
      {
        text: "Pemilik",
        sortable: true,
        value: "owner_id",
        align: "center"
      },
      { text: "Nomor SIM", value: "no_sim" },
      { text: "Nomor STNK", value: "no_stnk" },
      { text: "Jenis", value: "jenis", sortable: true, filterable: false, align: "center" },
      { text: "Actions", value: "actions", sortable: false, align:"center"},
    ],
    kendaraan: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      owner_id: "",
      no_sim: "",
      no_stnk: "",
      jenis: null,
    },
    defaultItem: {
      id: "",
      owner_id: "",
      no_sim: "",
      no_stnk: "",
      jenis: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah kendaraan" : "Edit Data kendaraan";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogDetails(val) {
      val || this.closeDetails();
    },
  },

  created() {
    this.initialize();
  },
  mounted() {
    KendaraanService.getAll()
      .then((res) => {
        this.kendaraan = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    initialize() {},
    getColor(status) {
      if (status == "Selesai") return "green";
      else if (status == "Aktif") return "blue";
    },

    editItem(item) {
      this.editedIndex = this.kendaraan.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.kendaraan.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      KendaraanService.delete(this.kendaraan[this.editedIndex].id) 
        .then(res => {
          this.$swal({
            title: 'Berhasil',
            text: res.messages,
            icon: 'success',  
            showConfirmButton: false,
            timer: 1000               
          })
          this.kendaraan.splice(this.editedIndex, 1);
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
    detailsItem(item) {
      this.editedIndex = this.kendaraan.indexOf(item);

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
      else{
        this.title = "Deleted"
      }

      this.dialogDetails = true;
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

    save() {
      if (this.$refs.form.validate()) {

        if (this.editedIndex > -1) {
          KendaraanService.edit(this.editedItem)
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
          Object.assign(this.kendaraan[this.editedIndex], this.editedItem);
        } 
      }


    }
  },
};
</script>
