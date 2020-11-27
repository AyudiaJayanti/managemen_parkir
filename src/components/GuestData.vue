<template>
  <v-app>
    <v-main class="px-5 py-5 mt-12 background-main">
      <h2>Data Tamu</h2>
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
          :items="tamu"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar class="toolbar-display" flat>
              <v-toolbar-title>Data Tamu</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="600px" height="80vh">
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
                    <v-row style="height: 50vh">
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.id"
                          type="phone"
                          label="ID"
                          required outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nama Tamu"
                          required outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="status"
                          label="Status"
                          v-model="editedItem.status"
                          dense
                          required outlined
                        >
                        </v-select>
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
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
export default {
  name: "Guest",
  components: {
  },
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
    status: ["Orangtua", "Perusahaan", "Sekolah"],
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", align: "start", value: "id" },
      {
        text: "Nama",
        sortable: false,
        value: "name",
      },
      { text: "Status", value: "status" },
      { text: "Tgl Registrasi", value: "tglRegis" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    tamu: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      nis: "",
      noKen: "",
      status: "",
    },
    defaultItem: {
      name: "",
      nis: 0,
      noKen: 0,
      status: "",
    },
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

  methods: {
    initialize() {
      this.tamu = [
        {
          name: "Candra",
          id: "T-00001",
          tglRegis: "12-05-2020",
          status: "Orangtua",
        },
        {
          name: "Candra",
          id: "T-00002",
          noKen: "D 2345 SU",
          tglRegis: "12-05-2020",
          status: "Perusahaan",
        },
      ];
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
      this.tamu.splice(this.editedIndex, 1);
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
        Object.assign(this.tamu[this.editedIndex], this.editedItem);
      } else {
        this.tamu.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
