<template>
  <v-container>
    <v-container fluid>
    <center>
      <div>
        <h3 class="mt-4">Create a new Meetup</h3>
        <div class="form">
            <v-text-field name="title" label="Title" v-model="title"></v-text-field>
            <img :src="src!==null? src : '../static/default.jpg'" class="image mb-4"></img>
            <br>
            <input style="display:none" id="upload" type="file" @change="changeImage">
            <label for="upload" class="btn--raised uploadImage">UPLOAD IMAGE</label>
            <v-text-field name="description" label="Description" v-model="description" class="mt-4"></v-text-field>
            <v-flex xs4>
              <v-text-field @change.native="lookupCoordinates()" name="place" label="State/Place/Street" v-model="place">
              </v-text-field>
            </v-flex>
            <gmap-map :center="center" :zoom=zoom class="map">
              <gmap-marker :key="index" v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
              ></gmap-marker>
            </gmap-map>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex>
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
            </v-container>
            <v-btn style="background-color:#dcd5d5" @click.native="addMeetup()">Create Meetup</v-btn>
        </div>
      </div>
    </center>
  </v-container>
</v-container>
</template>

<script>
import { db, storage } from '../firebase'
import axios from 'axios'

export default {
  data () {
    return {
      modal: null,
      modal2: null,
      date: null,
      time: null,
      src: null,
      filename: '',
      title: '',
      description: '',
      place: '',
      center: {lat: 0, lng: 0},
      markers: [
        {position: {lat: 0, lng: 0}}
      ],
      zoom: 1
    }
  },
  methods: {
    changeImage (event) {
      var img = event.target.files[0]
      this.filename = img.name
      var reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = () => {
        this.src = reader.result
      }
    },
    ApplyAdd (that, url) {
      var meetup = {
        title: that.title,
        description: that.description,
        author: 'lfx',
        date: that.date,
        time: that.time,
        imageUrl: url,
        place: that.place
      }
      if (
        meetup.title != null ||
        meetup.description != null ||
        meetup.date != null ||
        meetup.time != null ||
        meetup.place != null ||
        meetup.imageUrl != null) {
        db.ref('meetups').push(meetup)
        that.$router.push('/viewmeetups')
      }
    },
    addMeetup () {
      var that = this
      var storageRef = storage.ref()
      if (this.src != null) {
        storageRef.child('images/' + this.filename)
          .putString(this.src.split(',')[1], 'base64')
          .then(function (snapshot) {
            storageRef.child('images/' + that.filename).getDownloadURL().then(function (url) {
              that.ApplyAdd(that, url)
            })
          })
      }
    },
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

.form {
  padding-left: 15px;
  padding-right: 15px;
}

@media screen and (min-width: 1000px) {
  .form {
    width: 60%;
  }
}

@media screen and (max-width: 1000px) {
  .form {
      width: 80%;
  }
}

.uploadImage{
  background-color: #dcd5d5;
  color: #234344;
  padding: 10px 15px 10px 15px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
}

.image{
  width:100%;
  height:250px;
}

.map {
 height: 250px;
 width: 100%;
}
</style>
