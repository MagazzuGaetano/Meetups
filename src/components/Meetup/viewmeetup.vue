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
              <v-layout class="info--text" row wrap>
                <v-flex xs12><v-chip>{{ meetup.date | date }}</v-chip></v-flex>
                <v-flex><v-chip style="cursor:pointer">   
                  <router-link 
                    style="font-size:12px;text-decoration:none;color:rgba(0,0,0,.87)"
                    :to="'/googlemaps/' + meetup.id + '/' + meetup.place" >
                    <v-icon>room</v-icon>
                    {{ meetup.place }}
                  </router-link>
                </v-chip></v-flex>
              </v-layout>
              <div style="padding-left:12px;padding-top:10px">{{ meetup.description }}</div>
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
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
