// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import DateFilter from './filters/date'
import { store } from './store'
import * as firebase from 'firebase'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKXREuRYaLrN04ib_w5WK4Mypom4TpN6Y',
    v: '3.28'
  }
})

Vue.filter('date', DateFilter)

Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAzbnV4zYdaR7zsWAW84tmU5mWZV04weiU',
      authDomain: 'meetups-107a1.firebaseapp.com',
      databaseURL: 'https://meetups-107a1.firebaseio.com',
      projectId: 'meetups-107a1',
      storageBucket: 'meetups-107a1.appspot.com',
      messagingSenderId: '879065926299'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
