<template>
  <v-data-table
    :headers="headers"
    :items="siswa"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              TAMBAH
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nis"
                      type="phone"
                      label="NIS"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nama"
                      label="Nama Siswa"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="tingkat"
                      label="Tingkat"
                      v-model="editedItem.tingkat"
                      dense
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="jurusan"
                      label="Jurusan"
                      v-model="editedItem.jurusan"
                      dense
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.kelas"
                      :items="kelas"
                      label="Kelas"
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Nomor Kendaraan"
                      v-model="editedItem.noKen"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Nomor STNK"
                      v-model="editedItem.noSTNK"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Nomor SIM" 
                    v-model="editedItem.noSIM">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import StudentsService from '../services/StudentsService'
export default {
  data: () => ({
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
    kelas: ["A", "B", "C", "D"],
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "NIS", align: "start", value: "nis",},
      {
        text: "Nama Siswa",
        sortable: false,
        value: "nama",
      },
      { text: "Kelas", value: "kelas" },
      { text: "Tgl Registrasi", value: "tglRegis" },
      { text: "Nomor Kendaraan", value: "noKen" },
      { text: "Nomor STNK", value: "noSTNK" },
      { text: "Nomor SIM", value: "noSIM" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    siswa: [],
    editedIndex: -1,
    editedItem: {
      nama: "",
      nis: "",
      noKen: "",
      tingkat: "",
      kelas:"",
      jurusan: "",
      noSIM: "",
      noSTNK: "",
    },
    defaultItem: {
      nama: "",
      nis: 0,
      noKen: 0,
      kelas: 0,
      tingkat: "",
      jurusan: "",
      noSIM: 0,
      noSTNK: "",
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
  },

  created() {
    this.initialize();
  },
  mounted() {
    StudentsService.getAll(1)
      .then((res) => {
        this.siswa = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    initialize() {
    },

    editItem(item) {
      this.editedIndex = this.siswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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