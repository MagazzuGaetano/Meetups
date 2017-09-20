<template>
  <div>
    <v-navigation-drawer temporary v-model="sideNav" style="background-color:white">
    <v-list>
      <v-list-tile v-for="item in menuItems" @click.native="onSignOut(item.title)" :key="item.title" router :to="item.link">
        <v-icon>{{ item.icon }}</v-icon>
        <v-list-tile-action>
          <v-list-tile-content style="margin:5px">{{ item.title }}</v-list-tile-content>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="red accent-3">
      <v-toolbar-side-icon @click.native.stop="sideNav =! sideNav" class="white--text hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor:pointer" class="white--text">Meetups</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn class="white--text" flat v-for="item in menuItems" @click.native="onSignOut(item.title)"
         :key="item.title" router :to="item.link">
          <v-icon class="v-icon">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>

    <v-footer class="pa-5 red accent-3">
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }} Meetups.com</div>
    </v-footer>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'person_pin', title: 'View Meetups', link: '/viewmeetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/organizemeetup' },
          { icon: 'person', title: 'Profile', link: '/profile' },
          { icon: 'exit_to_app', title: 'logout', link: '/' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onSignOut (title) {
      if (title !== 'logout') return
      return this.$store.dispatch('signUserOut', null)
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
  .v-icon{
    margin-right: 10px;
  }
</style>
