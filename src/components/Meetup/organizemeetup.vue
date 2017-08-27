<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 class="mt-4 mb-5">
        <h3>Create a new Meetup</h3>
      </v-flex>
    </v-layout>  
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="imageUrl"
              label="imageUrl"
              id="imageUrl"
              v-model="imageUrl"
              required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
             <img :src='imageUrl' width="100%"></img>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="description"
              label="Description"
              id="description"
              v-model="description"
              multi-line
              required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              @change.native="lookupCoordinates()" 
              name="place" 
              label="Place"
              id="place"
              v-model="place"
              required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <gmap-map :center="center" :zoom=zoom class="map">
                <gmap-marker :key="index" v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
                ></gmap-marker>
              </gmap-map>
            </v-flex>
          </v-layout>

          <v-layout wrap row class="mt-5">
            <v-flex offset-sm3>
                <v-dialog persistent v-model="modal" style="background-color:white" lazy full-width>
                  <v-text-field slot="activator" label="Picker in dialog" v-model="date" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="date" scrollable style="background-color:white">
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                        <v-btn flat primary @click.native="save()">Save</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex>
                <v-dialog persistent v-model="modal2" style="background-color:white" lazy full-width>
                  <v-text-field slot="activator" label="Picker in dialog" v-model="time" prepend-icon="access_time" readonly></v-text-field>
                  <v-time-picker v-model="time" actions style="background-color:white">
                  <template scope="{ save, cancel }">
                  <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                  </template>
                  </v-time-picker>
                </v-dialog>
              </v-flex>

          </v-layout>

          <v-layout row class="mb-4 mt-2">
            <v-flex xs12 sm6 offset-sm3>
              <center><v-btn 
              style="background-color:#dcd5d5" 
              :disabled='!formisValid'
              type="submit">Create Meetup</v-btn></center>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      title: '',
      description: '',
      imageUrl: '',
      place: '',
      date: '',
      time: '',
      center: {lat: 0, lng: 0},
      markers: [
        {position: {lat: 0, lng: 0}}
      ],
      zoom: 2
    }
  },
  computed: {
    formisValid () {
      return this.title !== '' &&
        this.description !== '' &&
        this.imageUrl !== '' &&
        this.place !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    lookupCoordinates () {
      var that = this
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.place)
        .then((response) => {
          that.markers[0].position.lat = response.data.results[0].geometry.location.lat
          that.markers[0].position.lng = response.data.results[0].geometry.location.lng
          that.center.lat = response.data.results[0].geometry.location.lat
          that.center.lng = response.data.results[0].geometry.location.lng
          that.zoom = 13
        })
        .catch((error) => {
          console.log(error)
          that.center.lat = 0
          that.center.lng = 0
          that.markers[0].position.lat = 0
          that.markers[0].position.lng = 0
        })
    },
    onCreateMeetup () {
      if (!this.formisValid) return
      const data = {
        title: this.title,
        place: this.place,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', data)
      this.$router.push('/viewmeetups')
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}

.map {
 height: 250px;
 width: 100%;
}
</style>
