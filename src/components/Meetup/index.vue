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
          v-bind:src="item.imageUrl"
          :key="item.key"
          @click.native="onLoadMeetup(item.id)">
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
  data () {
    return {
      var: ''
    }
  },
  computed: {
    items () {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

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
