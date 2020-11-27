<template>
  <v-app>
    <v-main class="px-5 py-5 mt-12 background-main">
      <h2>Data Siswa</h2>
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
        <v-data-table
          :headers="headers"
          :items="siswa"
          sort-by="nis"
          class="elevation-1"
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
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.nis" type="phone" label="NIS" outlined></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.nama" label="Nama Siswa" outlined></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="tingkat"
                          label="Tingkat"
                          v-model="editedItem.tingkat"
                          dense
                          outlined
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="jurusan"
                          label="Jurusan"
                          v-model="editedItem.jurusan"
                          dense
                          outlined
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedItem.kelas"
                          :items="kelas"
                          label="Kelas"
                          dense
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Nomor Kendaraan"
                          v-model="editedItem.noKen"
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Nomor STNK"
                          v-model="editedItem.noSTNK"
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Nomor SIM"
                          v-model="editedItem.noSIM"
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
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
                    <!-- Tabel Identitas Kendaraan -->
                    <v-simple-table>
                      <template v-slot:default>
                        <thead class="orange">
                          <tr>
                            <th class="text-left">Jenis Kendaraan</th>
                            <th class="text-left">Nomor STNK</th>
                            <th class="text-left">Nomor SIM</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in IdentitasKendaraan" :key="item.id">
                            <td>{{ item.jk }}</td>
                            <td>{{ item.sim }}</td>
                            <td>{{ item.stnk }}</td>
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
                            <td>{{ item.tglmasuk }}</td>
                            <td>{{ item.jammasuk }}</td>
                            <td>{{ item.jamkeluar }}</td>
                            <td>{{ item.jeniskendaraan }}</td>
                            <td class="text-center">
                              <v-chip :color="getColor(item.status)" dark>
                                {{ item.status }}
                              </v-chip>
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
                      color="blue darken-1"
                      class="mr-0"
                      text
                      @click="closeDetails"
                      >Cancel</v-btn
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
            <v-icon small @click="detailsItem(item)"
              >mdi-information-outline</v-icon
            >
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SiswaService from "../services/SiswaService";
export default {
  name: "Student",

  components: {},

  data: () => ({
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
    tingkat: ["10", "11", "12"],
    jurusan: [
      "IOP",
      "MEKA",
      "PFPT",
      "RPL",
      "SIJA",
      "TEDK",
      "TEI",
      "TOI",
      "TPTU",
    ],

    IdentitasKendaraan: [
      {
        jk: "Mobil",
        sim: "123-456-789",
        stnk: "987-654-321",
      },
      {
        jk: "Motor",
        sim: "123-456-789",
        stnk: "987-654-321",
      },
    ],
    DataParkir: [
      {
        tglmasuk: "21-07-2020",
        jammasuk: "06:32AM",
        jamkeluar: "04:00PM",
        jeniskendaraan: "Motor",
        status: "Aktif",
      },
      {
        tglmasuk: "29-08-2020",
        jammasuk: "08:45AM",
        jamkeluar: "13:00PM",
        jeniskendaraan: "Mobil",
        status: "Selesai",
      },
    ],
    kelas: ["A", "B", "C", "D"],
    search: "",
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      { text: "NIS", align: "start", value: "nis" },
      {
        text: "Nama Siswa",
        sortable: false,
        value: "nama",
      },
      { text: "Kelas", value: "kelas" },
      { text: "Tgl Registrasi", value: "tglRegis" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    siswa: [],
    editedIndex: -1,
    editedItem: {
      nama: "",
      nis: "",
      tingkat: "",
      kelas: "",
      jurusan: "",
    },
    defaultItem: {
      nama: "",
      nis: 0,
      noKen: 0,
      kelas: 0,
      tingkat: "",
      jurusan: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Siswa" : "Edit Data Siswa";
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
    SiswaService.getAll(1)
      .then((res) => {
        this.siswa = res.data.data;
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
      this.editedIndex = this.siswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    detailsItem(item) {
      this.editedIndex = this.siswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDetails = true;
    },

    deleteItem(item) {
      this.editedIndex = this.siswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.siswa.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
      if (this.editedIndex > -1) {
        Object.assign(this.siswa[this.editedIndex], this.editedItem);
      } else {
        this.siswa.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
