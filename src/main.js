import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import VueSession from 'vue-session'
<<<<<<< HEAD
import Bars from 'vuebars'
import moment from 'moment'
import VuetifyConfirm from 'vuetify-confirm'
=======
import VuetifyConfirm from 'vuetify-confirm'
import Bars from 'vuebars'
import moment from 'moment'
import Vuelidate from 'vuelidate'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'
>>>>>>> candra/master

// import VueSessionStorage from 'vue-sessionstorage'

Vue.prototype.moment = moment
Vue.use(Bars)
Vue.config.productionTip = false
Vue.use(VueSweetalert2)
Vue.use(VueSession)
Vue.use(vuetify)
Vue.use(Vuelidate)
Vue.use(jspdf)
Vue.use(html2canvas)

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Ya',
  buttonFalseText: 'Tidak',
})
// Vue.use(VueSessionStorage)

new Vue({
  router,
  store,
  vuetify,  
  render: h => h(App)
}).$mount('#app')