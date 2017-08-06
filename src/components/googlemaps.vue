<template>
  <div>
    <v-toolbar class="white src-toolbar mt-5" floating dense>
        <v-btn icon :to="'/meetups/'+ id">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-text-field @change.native="SetPosition()"prepend-icon="search" hide-details single-line v-model='searchbar'></v-text-field>
    </v-toolbar>
    <gmap-map :center="center" :zoom="15" class="map">
      <gmap-marker :key="index" v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      place: '',
      id: '',
      searchbar: '',
      center: {lat: 0, lng: 0},
      markers: [
        {position: {lat: 0, lng: 0}}
      ]
    }
  },
  methods: {
    lookupCoordinates () {
      var that = this
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.searchbar)
        .then((response) => {
          that.markers[0].position.lat = response.data.results[0].geometry.location.lat
          that.markers[0].position.lng = response.data.results[0].geometry.location.lng
          that.center.lat = response.data.results[0].geometry.location.lat
          that.center.lng = response.data.results[0].geometry.location.lng
        })
        .catch((error) => {
          console.log(error)
          that.center.lat = 0
          that.center.lng = 0
          that.markers[0].position.lat = 0
          that.markers[0].position.lng = 0
        })
    },
    loadData () {
      this.id = this.$route.params.id
      this.place = this.$route.params.place
      this.searchbar = this.place
      this.lookupCoordinates()
    },
    SetPosition () {
      this.place = this.searchbar
      this.lookupCoordinates()
    }
  },
  created () {
    this.loadData()
  },
  watch: {
    '$route': 'loadData'
  }
}

</script>

<style>
.map {
 height: 650px;
 width: 100%;
}
.src-toolbar{
  position: absolute;
  z-index: 2;
  margin-left: 10px;
}
</style>
