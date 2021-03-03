<template>
  <v-container
    style="height: auto; width: 0;"
    class="mr-6"
  >
    <v-row>
      <v-menu
        bottom
        rounded
        offset-y
        
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="grey"
              size="40"
            >
              <span class="white--text headline">{{speakerInitials(name)}}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card dark>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                dark
                width="200px"
              >
                <span class="white--text headline">{{ speakerInitials(name) }}</span>
              </v-avatar>
              <h3>{{ this.$session.get('name') }}</h3>
              <p class="caption mt-1">
                {{ this.$session.get('email') }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                to="/profile"
              >
                Profil
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="logout"
              >
                Keluar
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      name: '',
    }),
    mounted() {
      
  },
    methods: {
      speakerInitials() {
        const name = this.$session.get('name').split(' ');
        return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : '' }`;
      },
      logout() {
        this.$confirm("Yakin Ingin Logout?").then(res => {
          if(res) {
            this.$session.destroy()
            this.$router.push('/')
          }
        })
      }
    },
  }
</script>