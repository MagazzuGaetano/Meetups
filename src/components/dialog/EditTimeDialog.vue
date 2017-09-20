<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<v-btn flat fab accent slot="activator">
			<v-icon class="black--text darken-1">query_builder</v-icon>
		</v-btn>
		<v-card style="background-color:white">
			<v-container>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-title class="black--text darken-1">Edit Meetup Time</v-card-title>
					</v-flex>
				</v-layout>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-text>
							<v-time-picker v-model="editedTime" style="width:100%" scrollable actions format="24hr"></v-time-picker>
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-actions>
							<v-btn flat class="blue--text darken-1" @click.native="editDialog=false">Close</v-btn>
							<v-btn flat class="blue--text darken-1" @click.native="onSaveChange">Save</v-btn>
						</v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editedTime: null
    }
  },
  created () {
    this.editedTime = new Date(this.meetup.date).toTimeString()
  },
  methods: {
    onSaveChange () {
      const newDate = new Date(this.meetup.date)
      const hours = this.editedTime.match(/^(\d+)/)[1]
      const minutes = this.editedTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.editDialog = false
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: newDate
      })
    }
  }
}
</script>