<template>
  <v-dialog with="350px" persistent v-model="cancelDialog">
		<v-btn class="error" slot="activator">Cancel</v-btn>
		<v-card style="background-color:white">
			<v-container>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-title>Delete the Meetup?</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider style="border:normal"></v-divider>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-text>
            	This action CANNOT be undone.
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-actions>
							<v-btn flat class="red--text darken-1" @click.native="cancelDialog=false">Cancel</v-btn>
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
      cancelDialog: false
    }
  },
  methods: {
    onAgree () {
      this.$store.dispatch('cancelMeetup', this.meetupId)
      this.cancelDialog = false
      this.$router.push('/viewmeetups')
    }
  }
}
</script>
