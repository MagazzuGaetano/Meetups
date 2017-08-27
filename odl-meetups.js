<v-container>
  <br>
  <p v-for="meetup of meetups">
    <v-card class="card">
      <v-layout>
          <v-flex xs4 pr-0>
            <v-card-media :src='meetup.imageUrl' height="150px"></v-card-media>
          </v-flex>
          <v-flex xs8 pl-0>
            <div class="container" style="height:65%">
              <div class="headline">{{ meetup.title }}</div>
              <div>{{ meetup.date }}<span>:</span>{{ meetup.time }}</div>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn error @click.native="removeMeetup(meetup)"><v-icon>delete</v-icon></v-btn>

              <router-link :to="/editmeetup/+encodeURIComponent(meetup['.key'])" class="white--text" style="text-decoration:none">
                <v-btn class="v-btn white--text" style="background-color:#f7b32c;"><v-icon>edit</v-icon></v-btn>
              </router-link>

              <router-link :to="/viewmeetups/+encodeURIComponent(meetup['.key'])" class="white--text" style="text-decoration:none">
                <v-btn class="v-btn" success><v-icon>description</v-icon></v-btn>
              </router-link>

            </v-card-actions>
          </v-flex>
        </v-layout>
    </v-card>
    <br>
  </p>
</v-container>
