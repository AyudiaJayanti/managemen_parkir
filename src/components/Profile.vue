<template >
  <v-app class="px-5 py-5 mt-12 background-main">
    <v-banner elevation="1" class="rounded-lg" color="white"> 
      <v-row > 
        <v-col lg="3" sm="12" >
          <v-row align="center" justify="center">
            <template>
                <v-avatar color="indigo" size="225" >
                  <v-icon dark size="75" >mdi-account-outline</v-icon>
                </v-avatar>
            </template>
          </v-row>
        </v-col>
        <v-col cols="9" class="d-flex flex-row align-end">
          <v-row>
            <v-col cols="12" class="mt-10">
              <h1 style="font-size: 36pt">{{ user.name }}</h1>
            </v-col>
            <v-col cols="12">
              <p>{{ user.email }}</p>
            </v-col>
            <v-col cols="12">
              <v-btn depressed dark color="indigo" class="mr-2 mb-2" @click="dialog = true">
                <v-icon left small>mdi-pencil</v-icon> Edit Profil
              </v-btn>
              <v-btn depressed outlined color="indigo" class="mb-2" @click="dialogPassword = true">
                <v-icon left small>mdi-key</v-icon> Ubah Password
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-banner>
    <v-dialog v-model="dialog" max-width="650px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Profil</span>
        </v-card-title>
        <v-card-text>       
          <v-row>  
            <v-col lg="12" sm="12" >
              <v-row align="center" justify="center">
                <template>
                    <v-avatar color="indigo" size="175" >
                      <v-icon dark size="75" >mdi-account-outline</v-icon>
                    </v-avatar>
                </template>
              </v-row>
            </v-col>
            <v-col cols="12" class="d-flex px-10 flex-row align-end">
              <v-form 
                ref="form" style="width: 100%" class="mt-5">
                <v-text-field
                  rounded
                  filled
                  v-model="name"
                  :rules="nameRules"></v-text-field>
                <v-text-field
                  rounded
                  filled
                  v-model="email"
                  :rules="emailRules"></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog=false; initialize()">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateProfile()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogPassword" max-width="450px">
      <v-card>
        <v-card-title>
          <span class="headline">Ubah Password</span>
        </v-card-title>
        <v-card-text>
           <v-form ref="form2" style="width: 100%" class="mt-5">
              <v-text-field 
                :rules="required"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="oldPassword" 
                label="password lama" outlined></v-text-field>
              <v-text-field 
                :rules="passwordRules"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                v-model="newPassword" 
                label="password baru" outlined></v-text-field>
              <v-text-field 
                :rules="[rePassword]"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                v-model="repeatPassword" 
                label="Konfirmasi Password" outlined></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" depressed text @click="dialogPassword=false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="updatePassword()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import UsersService from "../services/UsersService";
export default {
  name: 'Profile', 
  
  data: () => ({
    dialog: false,
    dialogPassword: false,
    absolute: true,
    overlay: false,
    user: [],
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
    show: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length > 2) || 'Name must be more than 2 characters'
    ],
    emailRules: [
      v => !!v || 'Email is required',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be more or equal to 8 characters'
    ],
    required: [
      v => !!v || 'This field is required',
    ]
    
  }),
  mounted() {
    this.initialize()
  },
  computed: {
    rePassword() {
      return () => (this.newPassword === this.repeatPassword) || 'Password harus sama'
    }
  },
  methods: {
    initialize() {
      this.oldPassword = ""
      this.newPassword = ""
      this.repeatPassword = ""
      
      UsersService.findOne(this.$session.get('id'))
      .then((response) => {
        this.user = response.data.data
        this.name = this.user.name
        this.email = this.user.email
      })
      .catch((err) => {
        console.log(err)
      })
    },
    updateProfile(){
      if(this.$refs.form.validate()) {
        UsersService.edit(this.$session.get('id'), this.name, this.email)
          .then((res) => {
            this.dialog = false
            this.$swal({
              title: 'Berhasil',
              text: res.messages,
              icon: 'success',  
              showConfirmButton: false,
              timer: 1000               
            })
            this.initialize()
          })
          .catch((err) => {
            this.$swal({
              title: 'Gagal',
              text: err.response.messages,
              icon: 'error',                    
              showConfirmButton: false,
              timer: 1000
            })
            this.initialize()
          })
      }
    },
    updatePassword(){
      if(this.$refs.form2.validate()) {
        UsersService.changePassword(this.$session.get('id'), this.oldPassword, this.newPassword)
          .then((res) => {
            
            this.dialogPassword=false
            this.dialog = false
            this.$swal({
              title: 'Berhasil',
              text: res.messages,
              icon: 'success',  
              showConfirmButton: false,
              timer: 1000               
            })
            this.initialize()
          })
          .catch((err) => {
          
            this.$swal({
              title: 'Gagal',
              text: err.response.data.message,
              icon: 'error',                    
            })
            this.initialize()
          })
      }
    }
  },
  
}
</script>