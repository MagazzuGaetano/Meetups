import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/Meetup/index'
import organizemeetup from '@/components/Meetup/organizemeetup'
import viewmeetups from '@/components/Meetup/viewmeetups'
import viewmeetup from '@/components/Meetup/viewmeetup'
import googlemaps from '@/components/Meetup/googlemaps'

import signin from '@/components/User/signin'
import signup from '@/components/User/signup'
import profile from '@/components/User/profile'

import middleware from './middleware'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/signin', name: 'signin', component: signin},
    {path: '/signup', name: 'signup', component: signup},
    {path: '/', name: 'index', component: index},
    {path: '/profile', name: 'profile', component: profile},
    {path: '/organizemeetup', name: 'organizemeetup', component: organizemeetup, beforeEnter: middleware},
    {path: '/viewmeetups', name: 'viewmeetups', component: viewmeetups},
    {path: '/meetups/:id', name: 'viewmeetup', component: viewmeetup, props: true},
    {path: '/googlemaps/:id/:place', name: 'googlemaps', component: googlemaps}
  ]
})
