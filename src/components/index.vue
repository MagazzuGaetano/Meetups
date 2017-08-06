<template>
<v-container>
  <v-layout row wrap class="mt-4">
    <v-flex xs12 class="text-xs-center t">
      <p>Featured Meetups</p>
    </v-flex>
  </v-layout>

  <v-layout row wrap class="mb-4">
    <v-flex xs12 sm6 class="text-xs-center text-sm-right">
      <router-link to="/viewmeetups" class="white--text" style="text-decoration:none">
        <v-btn info>
          <v-icon class="v-icon">person_pin</v-icon>EXPLORE MEETUPS
        </v-btn>
      </router-link>
    </v-flex>
    <v-flex xs12 sm6 class="text-xs-center text-sm-left">
      <router-link to="/organizemeetup" class="white--text" style="text-decoration:none">
        <v-btn style="background-color:#dcd5d5">
          <v-icon class="v-icon">place</v-icon>ORGANIZE A MEETUP
        </v-btn>
      </router-link>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-2">
    <v-flex xs12>
      <v-carousel style="cursor:pointer">
        <v-carousel-item
          v-for="item in items"
          v-bind:src="item.src"
          :key="item.key"
          @click.native="onLoadMeetup(item.key)">
          <div class="title">{{ item.title }}</div>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-5 mb-4">
    <v-flex xs12 class="text-xs-center paragrafe">
      <p>join our awensome Meetup commiunity , partecipate in Meetups and organize your own ones! There's nothing more awensome</p>
      than meeting amazing people sharing your passion!</p>
    </v-flex>
  </v-layout>

</v-container>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      items: [
        {
          src: '../static/NewYork.jpg',
          key: '-KpZ7WGUaLqFGLdhBVfW',
          title: 'New York Event !!!',
          description: 'an awensome meetup in the most populous American\'s City New York'
        },
        {
          src: '../static/Amsterdam.jpg',
          key: '-KqEHfyRVYedyoWT5hCN',
          title: 'Amsterdam Meetup!!!',
          description: 'a tour through the neighbourgs of Amsterdam'
        },
        {
          src: '../static/Londra.jpg',
          key: '-KpZ5gc2gGsBoPVBGr_3',
          title: 'London Meetup',
          description: 'a beatiful meetup inside the streets of London City'
        },
        {
          src: '../static/milan.jpg',
          key: '-KpJoj8x7GpkgDuXaIjd',
          title: 'Codeemotion 2017',
          description: 'Codemotion is a platform devoted to developers that connect IT professionals, tech communities, and IT companies. As we\'re a hub of innovation, we share the latest tech information and best practices among the tech community worldwide'
        }
      ]
    }
  },
  methods: {
    onLoadMeetup (key) {
      this.$router.push('/meetups/' + key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.paragrafe{
    font-size: 15px;
    font-weight: bold;
}

.t{
  font-size:45px;
}

.title{
  position: absolute;
  bottom: 50px;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
