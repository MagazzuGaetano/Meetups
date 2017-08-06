<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="mb-2 mt-2" v-for="meetup of meetups" :key="meetup['.key']">
          <v-container fluid>
            <v-layout>
              <v-flex xs5 sm4 md3>
                <v-card-media :src='meetup.imageUrl' height='130px'></v-card-media>
              </v-flex>
              <v-flex sm9 md8>
                <v-card-title primary-title>
                  <div>
                    <h5 class="mb-0">{{ meetup.title }}</h5>
                    <div>{{ meetup.date | format('en-GB', options) }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetups/'+encodeURIComponent(meetup['.key'])" class="black--text">
                    <v-icon left light>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {db} from '../firebase'

export default {
  data () {
    return {
      msg: 'view meetups',
      dialog: false,
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  firebase: {
    meetups: {source: db.ref('meetups')}
  },
  methods: {
    removeMeetup (meetup) { db.ref('meetups').child(meetup['.key']).remove() }
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

@media screen and (min-width: 1000px) {
  .card {
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .card {

  }
}

.v-btn{
  margin: 0px;
}

</style>
