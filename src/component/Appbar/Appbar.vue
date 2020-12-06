<template>
  <v-app>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent=""
        color="#393939"
        dark
        app
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title-size font-weight-medium ">
            Parkir
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        rounded
        class="clickable mt-6"
      >
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon size="20px">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="#333" dark>
        <v-app-bar-nav-icon
          @click.stop="mini = !mini"
          class="clickable"
          left
        ></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-toolbar-title class="mr-0 pr-4">
          <span class="hidden-sm-and-down">{{moment().format('DD MMMM YYYY')}}</span>
        </v-toolbar-title>
        <Avatar class="mr-6" />
      </v-app-bar>
    </div>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
import Avatar from "../Avatar";
export default {
  name: "App",
  props: {
    source: String,
  },
  components: {
    Avatar,
  },

  data: () => ({
    tanggal: new Date().toLocaleString(),
    drawer: null,
    mini: false,
    fab: false,
    items: [
      {
        icon: "mdi-view-dashboard-outline",
        text: "Dashboard",
        route: "/Dashboard",
      },
      { icon: "mdi-parking", text: "Data Parkir", route: "/Parking" },
      { icon: "mdi-school-outline", text: "Data Siswa", route: "/Students" },
      {
        icon: "fa fa-chalkboard-teacher",
        text: "Data Guru",
        route: "/Teacher",
      },
      { icon: "mdi-help-circle-outline", text: "Data Tamu", route: "/Guest" },
      { icon: "mdi-car-outline", text: "Data Kendaraan", route: "/Vehicle" },
      { icon: "mdi-account-check-outline", text: "Data User", route: "/User" },
    ],
  }),
};
</script>

