import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import signup from '@/components/signup'
import index from '@/components/index'
import profile from '@/components/profile'
import organizemeetup from '@/components/organizemeetup'
import viewmeetups from '@/components/viewmeetups'
import viewmeetup from '@/components/viewmeetup'
import editmeetup from '@/components/editmeetup'
import googlemaps from '@/components/googlemaps'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/login', name: 'login', component: login},
    {path: '/signup', name: 'signup', component: signup},
    {path: '/', name: 'index', component: index},
    {path: '/profile', name: 'profile', component: profile},
    {path: '/organizemeetup', name: 'organizemeetup', component: organizemeetup},
    {path: '/viewmeetups', name: 'viewmeetups', component: viewmeetups},
    {path: '/meetups/:id', name: 'viewmeetup', component: viewmeetup},
    {path: '/editmeetup/:id', name: 'editmeetup', component: editmeetup},
    {path: '/googlemaps/:id/:place', name: 'googlemaps', component: googlemaps}
  ]
})
