import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import MultiFiltersPlugin from './plugins/MultiFilters'
import VueSweetalert2 from 'vue-sweetalert2';
import VueSession from 'vue-session'
import VuetifyConfirm from 'vuetify-confirm'
import Bars from 'vuebars'
import moment from 'moment'
import Vuelidate from 'vuelidate'
import jspdf from 'jspdf'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'

import '@babel/polyfill'

// import VueSessionStorage from 'vue-sessionstorage'

Vue.config.productionTip = false

Vue.prototype.moment = moment
Vue.use(Bars)
Vue.use(VueSweetalert2)
Vue.use(VueSession)
Vue.use(vuetify)
Vue.use(Vuelidate)

Vue.use(jspdf)

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Ya',
  buttonFalseText: 'Tidak',
})

// Vue.use(VueSessionStorage)

Vue.use(new VueSocketIO({
  connection: io('localhost:3000'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

Vue.use(MultiFiltersPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')