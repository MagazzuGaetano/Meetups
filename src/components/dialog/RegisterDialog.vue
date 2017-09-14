<template>
	<v-dialog with="350px" persistent v-model="registerDialog">
		<v-btn class="success" slot="activator">{{ userIsRegistered ? 'Unregister' : 'Register' }}</v-btn>
		<v-card style="background-color:white">
			<v-container>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
						<v-card-title v-else>Register for Meetup?</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider style="border:normal"></v-divider>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-text>
            	You can always change your decision later on.
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-actions>
							<v-btn flat class="red--text darken-1" @click.native="registerDialog=false">Cancel</v-btn>
							<v-btn flat class="green--text darken-1" @click.native="onAgree">Confirm</v-btn>
						</v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registerDialog: false
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
      this.registerDialog = false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  }
}
</script>
