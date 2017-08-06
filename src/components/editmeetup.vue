<template>
  <div class="editmeetup" v-if="meetup">
      <br>
      <br>
      <v-container fluid>
      <center><div>
        <h3>Edit Meetup</h3>
        <br>
        <div class="form">
          <v-text-field name="title" label="Title" v-model="title"></v-text-field>
          <br>
          <img :src="src!==null? src : '../static/default.jpg'" class="image"></img>
          <br>
          <br>
          <input style="display:none" id="upload" type="file" @change="changeImage">
          <label for="upload" class="btn--raised uploadImage">UPLOAD IMAGE</label>
          <br>
          <v-text-field name="description" label="Description" v-model="description"></v-text-field>
          <br>
          <v-text-field name="place" label="place" v-model="place"></v-text-field>
          <br>
          <v-container fluid>
            <v-layout row>
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
                <br>
                <v-dialog persistent v-model="modal2" style="background-color:white" lazy full-width>
                  <v-text-field slot="activator" label="Picker in dialog" v-model="time" prepend-icon="access_time" readonly ></v-text-field>
                  <v-time-picker v-model="time" actions style="background-color:white">
                  <template scope="{ save, cancel }">
                  <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                  </template>
                  </v-time-picker>
                </v-dialog>
            </v-layout>
          </v-container>
          <br>
          <v-btn style="background-color:#dcd5d5" @click.native="editMeetup()">OK</v-btn>
          <router-link to="/viewmeetups" class="white--text" style="text-decoration:none"><v-btn error>CANCEL</v-btn></router-link>
        </div>
        <br>
    </div></center></v-container>
  </div>
</template>

<script>
import { db, storage } from '../firebase'

export default {
  name: 'editmeetup',
  data () {
    return {
      modal: null,
      modal2: null,
      date: null,
      time: null,
      src: null,
      filename: '',
      key: '',
      title: '',
      description: '',
      meetup: '',
      place: ''
    }
  },
  methods: {
    changeImage (event) {
      if (!event.target.files) return
      var img = event.target.files[0]
      this.filename = img.name
      var reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = () => {
        this.src = reader.result
      }
    },
    editMeetup () {
      if (this.src === this.oldImage) {
        this.applyEdit()
      } else {
        var storageRef = storage.ref()
        storageRef.child('images/' + this.filename)
          .putString(this.src.split(',')[1], 'base64')
          .then((snapshot) =>
            storageRef.child('images/' + this.filename)
              .getDownloadURL()
              .then((url) => this.applyEdit(url))
          )
      }
    },
    applyEdit (url) {
      console.log(this)
      var meetup = {
        description: this.description,
        title: this.title,
        author: 'lfx',
        date: this.date,
        time: this.time,
        imageUrl: url || this.oldImage,
        place: this.place
      }
      this.$firebaseRefs.meetups.child(this.meetup['.key']).set(meetup)
      this.$router.push('/viewmeetups')
    },
    loadData () {
      this.id = this.$route.params.id
      var meetup = this.meetups.filter(x => {
        return x['.key'] === this.id
      })[0]

      this.title = meetup.title
      this.description = meetup.description
      this.src = meetup.imageUrl
      this.date = meetup.date
      this.time = meetup.time
      this.place = meetup.place

      this.oldImage = meetup.imageUrl

      this.meetup = meetup
    }
  },
  firebase: {
    meetups: {source: db.ref('meetups')}
  },
  created () {
    this.loadData()
  },
  watch: {
    '$route': 'loadData'
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
  width:400px;
  height:250px;
}

</style>
