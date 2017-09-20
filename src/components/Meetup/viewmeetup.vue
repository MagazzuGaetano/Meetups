<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-layout style="padding:10px">
                <v-btn flat to='/viewmeetups/' style="font-size:18px" class="black--text"><v-icon left light class="black--text">arrow_back</v-icon>
                  {{ meetup.title }}
                </v-btn>
                <template v-if="userIsCreator">
                  <v-spacer></v-spacer>
                  <editMeetupDialog :meetup="meetup" v-if="userIsCreator"></editMeetupDialog>
                </template>
            </v-layout>
            <v-card-media :src='meetup.imageUrl' height='400px'></v-card-media>
            <v-card-text>
              <v-layout class="info--text" row wrap>
                <v-flex xs12><v-chip>{{ meetup.date | date }}</v-chip></v-flex>
                <v-layout>
                  <editDateDialog :meetup="meetup" v-if="userIsCreator"></editDateDialog>
                  <editTimeDialog :meetup="meetup" v-if="userIsCreator"></editTimeDialog>
                </v-layout>
                <v-flex xs12><v-chip style="cursor:pointer">   
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
              <registerDialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></registerDialog>
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
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) return
      return this.$store.getters.user.id === this.meetup.author
    }
  }
}
</script>

<style scoped>
</style>
