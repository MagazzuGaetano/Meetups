// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import VeeValidate from 'vee-validate'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKXREuRYaLrN04ib_w5WK4Mypom4TpN6Y',
    v: '3.28'
    // libraries: 'places', //// If you need to use place input
  }
})

Vue.filter('format', function (value, lan, opts) {
  return new Date(value).toLocaleString(lan, opts)
})

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
