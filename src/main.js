import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import VueSession from 'vue-session'
import Bars from 'vuebars'
import moment from 'moment'

// import VueSessionStorage from 'vue-sessionstorage'

Vue.prototype.moment = moment
Vue.use(Bars)
Vue.config.productionTip = false
Vue.use(VueSweetalert2)
Vue.use(VueSession)
// Vue.use(VueSessionStorage)

new Vue({
  router,
  store,
  vuetify,  
  render: h => h(App)
}).$mount('#app')