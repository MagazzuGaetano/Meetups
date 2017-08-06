<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-layout>
              <v-flex xs1>
                <v-btn flat to='/viewmeetups/' style="font-size:18px" class="black--text"><v-icon left light class="black--text">arrow_back</v-icon>
                  {{ meetup.title }}
                </v-btn>
              </v-flex>
              <v-flex>
                <v-card-title>
                  <h6 style="font-weight:bold" class="mt-1"></h6>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-card-media :src='meetup.imageUrl' height='400px'></v-card-media>
            <v-card-text>
              <div class="info--text">
                <v-chip>{{ meetup.date | format('en-GB', options)}}</v-chip>
                <v-chip>{{ meetup.time }}</v-chip>
                <v-chip @click.native="link('/googlemaps/'+ meetup['.key'] + '/' + meetup.place)" style="cursor:pointer"><v-icon>room</v-icon>{{ meetup.place }}</v-chip>
              </div>
              <div>{{ meetup.description }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="success">register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
     </v-container>
</template>

<script>
import { db } from '../firebase'

export default {
  data () {
    return {
      id: null,
      registered: false,
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  firebase: {
    meetups: {source: db.ref('meetups')}
  },
  created () {
    this.id = this.$route.params.id
  },
  computed: {
    meetup () {
      return this.meetups.filter(x => {
        return x['.key'] === this.id
      })[0]
    }
  },
  methods: {
    link (url) {
      window.location.href = url
    },
    changeState () {
      this.registered = !this.registered
      // controllo se nella tabella meetupsusers è presente la chiave dell'utente corrente
      if (this.registered === false) {
        // se non è presente lo aggiungo all'evento
        this.unregister()
      } else {
        // se è presente lo tolgo dall'evento
        this.register()
      }
    },
    register () {
      // controllo data di registrazione e la capacità dell'evento
      // incremento di uno il numero di partecipanti all'evento
      var capacity = this.meetup.capacity++
      this.$firebaseRefs.meetups.child(this.meetup['.key']).child('capacity').set(capacity)
      alert('REGISTERED')
    },
    unregister () {
      // decremento di uno il numero di partecipanti all'evento
      var capacity = this.meetup.capacity--
      this.$firebaseRefs.meetups.child(this.meetup['.key']).child('capacity').set(capacity)
      alert('UNREGISTERED')
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
</style>
