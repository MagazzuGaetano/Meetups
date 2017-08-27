<v-container fluid>
  <v-card>
    <v-card-media :src='meetup.imageUrl' height="300px"></v-card-media>
     <v-card-title primary-title>
       <div>
           <span class="headline">{{ meetup.title }}</span><br>
           <span>{{ meetup.date }}<span>:</span>{{ meetup.time }}</span><br>
           <span>{{meetup.description}}</span><br>
           <span>{{meetup.author}}</span><br>
           <span>{{meetup.capacity}} / {{meetup.max_capacity}}</span><br>
           <span>{{meetup.category}}</span>
       </div>
     </v-card-title>
     <v-card-actions>
       <router-link to="/viewmeetups" class="white--text" style="text-decoration:none">
         <v-btn primary><v-icon class="v-icon">list</v-icon>BACK TO LIST</v-btn>
       </router-link>
       <v-spacer></v-spacer>
       <v-btn success @click.native="changeState()">REGISTER</v-btn>
     </v-card-actions>
   </v-card>
 </v-container>
