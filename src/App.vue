<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>      
      
      <v-btn-toggle>
        <v-btn        
          color="primary"
          :to="{name: 'masuk'}">
          Masuk
        </v-btn>
        <v-btn          
          color="primary"
          :to="{name: 'keluar'}">
          Keluar
        </v-btn>
      </v-btn-toggle>
    </v-app-bar>

    <v-main contain>  
      <v-container>    
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <router-view />         
          </v-col>
          <v-spacer></v-spacer>
        </v-row>  
      </v-container>          
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',    
}

</script>
