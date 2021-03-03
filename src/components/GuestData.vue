<template>
  <v-app class="px-5 py-5 mt-12 background-main">
      <h2>Data Tamu</h2>
      <div class="py-5 px-5 mt-3 white">
        <v-row class="mt-2">
          <v-col lg="6" md="6" sm="12">
            <v-text-field
              filled
              rounded
              placeholder="Search"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
        <v-data-table
          :headers="headers"
          :items="tamu"
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
              <v-toolbar-title>Data Tamu</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="600px" height="80vh">
                <!-- <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    TAMBAH
                  </v-btn>
                </template> -->
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
                          v-model="editedItem.id"
                          type="phone"
                          label="ID"
                          required outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.nama"
                          label="Nama Tamu"
                          required outlined
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="instansi"
                          label="Instansi"
                          :rules="instansiRules"
                          v-model="editedItem.instansi"
                          outlined
                          required 
                        >
                        </v-select>
                      </v-col>
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" @click="save">
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
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-btn 
              rounded 
              depressed 
              @click="detailsItem(item)">
              <v-icon left small color="primary">mdi-information</v-icon>
              Detail
            </v-btn>
          </template>
          <template v-slot:[`item.createdAt`]="{ item }">
            <v-btn v-if="item.parkirs[0].keluar == null"
              color="red"
              dark
              rounded
              @click="guestExit(item.id)"
            >Keluar</v-btn>
            <v-btn v-else
              disabled
              depressed
              rounded
            >Selesai</v-btn>
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
      <v-dialog v-model="dialogDetails" max-width="700px">
        <v-card class="px-2">
          <v-card-title>Detail Data</v-card-title>
          <div>
            <v-card-subtitle>Detail Parkir</v-card-subtitle>
            <v-simple-table>
              <template v-slot:default>
                <thead class="orange">
                  <tr>
                    <th class="text-left white--text">Id Parkir</th>
                    <th class="text-left">Jam Masuk</th>
                    <th class="text-left">Jam Keluar</th>
                    <th class="text-left">Jenis Kendaraan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in editedItem.parkirs" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.masuk }}</td>
                    <td>{{ item.keluar }}</td>
                    <td v-if="item.role == 2" >Mobil</td>
                    <td v-else >Motor</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <v-card-subtitle> </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              class="mr-0"
              text
              @click="closeDetails()"
            >
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <router-view></router-view>
  </v-app>
</template>

<script>
import GuestService from "../services/GuestService";
import ParkirService from "../services/ParkirService";
export default {
  name: "Guest",
  components: {
  },
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
    instansi: ["Orangtua", "Perusahaan", "Sekolah", "Umum"],
    search: "",
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      { text: "ID", align: "center", value: "id"},
      { text: "Nomor Kendaraan", value: "nama",sortable: true },
      { text: "Instansi", value: "instansi", sortable: true},
      { text: "Actions", value: "actions", sortable: false, align: "center" },
      { text: "Status", align: "center", value: "createdAt", filterable:false},
    ],
    tamu: [],
    editedIndex: -1,
    editedItem: {
      nama: "",
      instansi: "",
    },
    defaultItem: {
      nama: "",
      instansi: 0,
    },
    valid: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length > 2) || 'Name must be more than 2 characters'
    ],
    instansiRules: [
      v => !!v || 'Instansi is required',
    ],
    
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Tamu" : "Edit Data Tamu";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  mounted() {
    GuestService.getAll()
      .then((res) => {
        this.tamu = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    initialize() {
      GuestService.getAll()
      .then((res) => {
        this.tamu = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    editItem(item) {
      this.editedIndex = this.tamu.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.tamu.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      GuestService.delete(this.tamu[this.editedIndex].id)
        .then(res => {
          this.$swal({
            title: 'Berhasil',
            text: res.data.messages,
            icon: 'success',  
            showConfirmButton: false,
            timer: 1000               
          })
        }).catch(err => {
          this.$swal({
            title: 'Gagal',
            text: err.response.data.messages,
            icon: 'error',                    
            showConfirmButton: false,
            timer: 1000
          })
        })
      this.tamu.splice(this.editedIndex, 1);
      this.closeDelete();
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
          GuestService.edit(this.editedItem)
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
  
          Object.assign(this.tamu[this.editedIndex], this.editedItem);
        } else {
          this.tamu.push(this.editedItem);
        }        
      }
    },
    guestExit(id) {
      this.$confirm("Yakin Tamu Ingin Keluar?").then(res => {
        if(res) {
          ParkirService.keluar(id)
          .then(response => {
            console.log(response.data.messages)                  
            this.$swal({
              title: 'Berhasil',
              text: 'Berhasil Mengeluarkan Tamu',
              icon: 'success',  
              showConfirmButton: false,
              timer: 1000               
            })
            GuestService.getAll()
            .then((res) => {
              this.tamu = res.data.data;
            })
            .catch((err) => {
              console.log(err);
            });
          })      
          .catch(err => {
            console.log(err.response.data.messages)                  
            this.$swal({
              title: 'Gagal',
              text: 'Gagal Mengeluarkan Tamu',
              icon: 'error',                    
              showConfirmButton: false,
              timer: 1000
            })
          })
        }
      })
    },
    detailItem(item) {
      this.editedIndex = this.tamu.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDetails = true;
    },
    closeDetails() {
      this.dialogDetails = false
    }
  },
};
</script>