<template>
  <v-app>
    <v-main class="px-5 py-5 mt-12 background-main">
      <h2>Data User</h2>
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
              :items="month"
              label="Bulan"
              solo
              rounded
              background-color="#E5E5E5"
            ></v-select>
          </v-col>
        </v-row>
        <!--Table-->
        <div>
          <v-data-table
            :headers="headers"
            :items="user"
            sort-by="id"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar class="toolbar-display" flat>
                <v-toolbar-title>Data User</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
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
                            <v-file-input
                              :rules="rules"
                              accept="image/png, image/jpeg, image/bmp"
                              placeholder="Pick an avatar"
                              prepend-icon="mdi-camera"
                              label="Avatar"
                              outlined
                            ></v-file-input>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.id"
                              append-icon="mdi-magnify"
                              label="ID" outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="Nama User" outlined required></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="Username" outlined required> </v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="Password" outlined required> </v-text-field>
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

                <v-dialog v-model="dialogEdit" max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                            <v-file-input
                              :rules="rules"
                              accept="image/png, image/jpeg, image/bmp"
                              placeholder="Pick an avatar"
                              prepend-icon="mdi-camera"
                              label="Avatar"
                              outlined
                            ></v-file-input>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.nis"
                            label="ID"
                            disabled outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.nama"
                            label="Nama User"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="E-mail"
                            v-model="editedItem.email"
                            outlined
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Password"
                            v-model="editedItem.password"
                            :type="show ? 'password' : 'text'"
                            @click:append="show = !show"
                            outlined
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeEdit">
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
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
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
      </div>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import UsersService from "../services/UsersService";
export default {
  data: () => ({
    name: "User",
    show: false,
    search: "",
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    month: [
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

    headers: [
      { text: "Foto", value: "avatar" },
      { text: "ID (NIP)", align: "start", value: "nis" },
      {
        text: "Nama User",
        sortable: false,
        value: "nama",
      },
      { text: "Username", value: "username" },
      { text: "Tgl Registrasi", value: "tglRegis" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    user: [],
    editedIndex: -1,
    editedItem: {
      avatar: "",
      name: "",
      id: "",
      username: "",
    },
    defaultItem: {
      avatar: "",
      name: "",
      id: "",
      username: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah User" : "Edit Data User";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  mounted() {
    UsersService.getAll(1)
      .then((res) => {
        this.user = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.user.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },

    deleteItem(item) {
      this.editedIndex = this.user.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.user.splice(this.editedIndex, 1);
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

    closeEdit() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.user[this.editedIndex], this.editedItem);
      } else {
        this.user.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
