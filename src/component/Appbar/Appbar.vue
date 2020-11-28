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
        <v-list-item class="px-2 pt-1">
          <v-list-item-avatar>
          <img
            src="./logo.png"
            alt="admin"
            style="width: 30px; height: auto"
            class="mx-auto"
          />
        </v-list-item-avatar>
          <v-list-item-title
            class="text-left text-capitalize display-1 pl-4 pt-4"
          >Parkir</v-list-item-title>
        </v-list-item>
        <v-list shaped class="clickable pt-5">
          <template v-for="item in items">
            <!-- v-slot:activator-->
            <v-list-item
              :key="item.text"
              active-class="white--text"
              route
              :to="item.route"
              class="mt-2 font-weight-normal"
              style="font-size: 18px">
              <v-list-item-action>
                <v-icon>{{ item.icon }} </v-icon>
              </v-list-item-action>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item>
          </template>
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
          <span class="hidden-sm-and-down">{{tanggal}}</span>
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
      { icon: "mdi-account-check-outline", text: "Data User", route: "/User" },
    ],
  }),
};
</script>

<style>
.clickable {
  -webkit-app-region: no-drag;
}
</style>
