<template>
  <v-data-table
    :headers="headers"
    :items="guru"
    sort-by="nip"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Data Guru</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
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
                      v-model="editedItem.nip"
                      type="phone"
                      label="NIP"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nama Guru"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="jurusan"
                      label="Jurusan"
                      v-model="editedItem.jurusan"
                      dense
                    >
                    </v-select>
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
                    <v-text-field label="Nomor SIM" v-model="editedItem.noSIM">
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
export default {
  data: () => ({
    jurusan: [
      "NA",
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
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "NIP", align: "start", value: "nip" },
      {
        text: "Nama Guru",
        sortable: false,
        value: "name",
      },
      { text: "Jurusan", value: "jurusan" },
      { text: "Tgl Registrasi", value: "tglRegis" },
      { text: "Nomor Kendaraan", value: "noKen" },
      { text: "Nomor STNK", value: "noSTNK" },
      { text: "Nomor SIM", value: "noSIM" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    guru: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      nip: "",
      noKen: "",
      jurusan: "",
      noSIM: "",
      noSTNK: "",
    },
    defaultItem: {
      name: "",
      nip: 0,
      noKen: 0,
      jurusan: "",
      noSIM: 0,
      noSTNK: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Guru" : "Edit Data Guru";
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

  methods: {
    initialize() {
      this.guru = [
        {
          name: "Diky Ridwan",
          nip: 1811138,
          noKen: "D 2345 SU",
          jurusan: "SIJA",
          tglRegis: "12-05-2020",
          noSTNK: "121212121",
          noSIM: "121212121",
        },
        {
          name: "Nandang",
          nip: 1811138,
          noKen: "D 3335 BF",
          jurusan: "NA",
          tglRegis: "12-06-2020",
          noSTNK: "121212121",
          noSIM: "121212121",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.guru.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.guru.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.guru.splice(this.editedIndex, 1);
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
        Object.assign(this.guru[this.editedIndex], this.editedItem);
      } else {
        this.guru.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>